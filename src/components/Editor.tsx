import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-preact'
import { Store } from '../store'  // tslint:disable-line no-unused-variable
import { lint } from '../linter'
import * as monaco from 'monaco-editor'
import { positioning } from './Reports'

const Container = styled('div')`
  border-bottom: 1px solid #ccc;
  height: 70vh;
`

@inject('store')
@observer
export default class extends Component<{ store: Store }, {}> {
  private monaco!: typeof monaco
  private editor!: monaco.editor.IEditor

  render({ store }) {
    return (
      <Container id="editor-container" />
    )
  }

  shouldComponentUpdate() {
    return false
  }

  async componentDidMount() {
    // tslint:disable-next-line space-in-parens
    this.monaco = await import(/* webpackPreload: true */ 'monaco-editor')
    this.editor = this.monaco.editor.create(
      document.getElementById('editor-container')!,
      {
        language: 'javascript',
        fontSize: 14,
        value: this.props.store.code,
        smoothScrolling: true,
        lightbulb: {
          enabled: true
        }
      }
    )

    this
      .monaco
      .languages
      .typescript
      .javascriptDefaults
      .setDiagnosticsOptions({ noSyntaxValidation: true })

    const model = this.editor.getModel() as monaco.editor.ITextModel
    model.onDidChangeContent(
      () => this.props.store.updateCode(model.getValue())
    )
    reaction(
      () => this.props.store.indent.type,
      indent => {
        model.updateOptions({
          insertSpaces: indent === 'space'
        })
      },
      { fireImmediately: true }
    )
    reaction(
      () => this.props.store.indent.size,
      indent => {
        model.updateOptions({
          tabSize: indent
        })
      },
      { fireImmediately: true }
    )

    const codeActionProvider = {
      provideCodeActions: (
        textModel: monaco.editor.ITextModel,
        range: monaco.Range,
        context: monaco.languages.CodeActionContext,
        token: monaco.CancellationToken
      ) =>
        context
          .markers
          .filter(marker => marker.source === 'eslint')
          .filter(({ relatedInformation }) => relatedInformation)
          .map(problem => {
            const fix = problem.relatedInformation![0]
            return {
              title: `Fix this ${fix.message} problem`,
              diagnostics: [problem],
              edit: {
                edits: [{
                  resource: textModel.uri,
                  edits: [{
                    text: problem.code,
                    range: fix
                  }]
                }]
              }
            } as monaco.languages.CodeAction
          })
    }
    this
      .monaco
      .languages
      .registerCodeActionProvider('javascript', codeActionProvider)
    this
      .monaco
      .languages
      .registerCodeActionProvider('typescript', codeActionProvider)
    this
      .monaco
      .languages
      .registerCodeActionProvider('html', codeActionProvider)

    reaction(
      () => this.props.store.lintingResult.map(result => ({
        startLine: result.line,
        startColumn: result.column,
        endLine: result.endLine === undefined ? result.line : result.endLine,
        endColumn: result.endColumn === undefined
          ? result.column
          : result.endColumn,
        severity: result.severity,
        rule: result.ruleId,
        message: result.message,
        fix: result.fix
      })),
      reports => this.monaco.editor.setModelMarkers(
        this.editor.getModel() as monaco.editor.ITextModel,
        'eslint',
        reports.map(report => {
          const textModel = this.editor.getModel() as monaco.editor.ITextModel
          return {
            startLineNumber: report.startLine,
            startColumn: report.startColumn,
            endLineNumber: report.endLine,
            endColumn: report.endColumn,
            severity: report.severity === 2
              ? this.monaco.MarkerSeverity.Error as number
              : this.monaco.MarkerSeverity.Warning as number,
            owner: 'eslint',
            message: report.rule
              ? `${report.message} (${report.rule})`
              : `${report.message}`,
            code: report.fix ? report.fix.text : undefined,
            source: 'eslint',
            relatedInformation: report.fix
              ? [{
                startLineNumber:
                  textModel.getPositionAt(report.fix.range[0]).lineNumber,
                startColumn:
                  textModel.getPositionAt(report.fix.range[0]).column,
                endLineNumber:
                  textModel.getPositionAt(report.fix.range[1]).lineNumber,
                endColumn:
                  textModel.getPositionAt(report.fix.range[1]).column,
                message: report.rule,
                resource: textModel.uri
              } as monaco.editor.IRelatedInformation]
              : undefined
          } as monaco.editor.IMarkerData
        })
      )
    )
    reaction(
      () => this.props.store.parser,
      parser => {
        if (parser === 'typescript-eslint-parser') {
          this.monaco.editor.setModelLanguage(
            this.editor.getModel() as monaco.editor.ITextModel,
            'typescript'
          )
        } else if (parser === 'vue-eslint-parser') {
          this.monaco.editor.setModelLanguage(
            this.editor.getModel() as monaco.editor.ITextModel,
            'html'
          )
        } else {
          this.monaco.editor.setModelLanguage(
            this.editor.getModel() as monaco.editor.ITextModel,
            'javascript'
          )
        }
      }
    )

    this.props.store.updateLintingResult(lint({
      code: this.props.store.code,
      parserName: this.props.store.parser,
      parserOptions: this.props.store.parserOptions,
      rules: this.props.store.rules,
      env: this.props.store.envs,
      settings: this.props.store.sharedSettings
    }))

    positioning.subscribe(([line, column]) => {
      this.editor.setPosition({ lineNumber: line, column })
      this.editor.focus()
    })
  }

  componentWillUnmount() {
    this.editor.dispose()
  }

  componentWillReceiveProps({ store: { code } }) {
    (this.editor.getModel() as monaco.editor.ITextModel).setValue(code)
  }
}
