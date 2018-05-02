import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-preact'
import { Store } from '../store'
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

  render ({ store }) {
    return (
      <Container id="editor-container" />
    )
  }

  shouldComponentUpdate () {
    return false
  }

  async componentDidMount () {
    // tslint:disable-next-line space-in-parens
    this.monaco = await import(/* webpackPreload: true */ 'monaco-editor')
    this.editor = this.monaco.editor.create(
      document.getElementById('editor-container')!,
      {
        language: 'javascript',
        fontSize: 14,
        value: this.props.store.code
      }
    )

    const model = this.editor.getModel() as monaco.editor.ITextModel
    model.onDidChangeContent(
      () => this.props.store.updateCode(model.getValue())
    )

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
        message: result.message
      })),
      reports => this.monaco.editor.setModelMarkers(
        this.editor.getModel() as monaco.editor.ITextModel,
        'eslint',
        reports.map(report => ({
          startLineNumber: report.startLine,
          startColumn: report.startColumn,
          endLineNumber: report.endLine,
          endColumn: report.endColumn,
          severity: report.severity === 2
            ? this.monaco.Severity.Error as number
            : this.monaco.Severity.Warning as number,
          owner: 'eslint',
          message: report.rule
            ? `[eslint] ${report.message} (${report.rule})`
            : `[eslint] ${report.message}`
        }))
      )
    )

    this.props.store.updateLintingResult(lint({
      code: this.props.store.code,
      parserName: this.props.store.parser,
      parserOptions: this.props.store.parserOptions,
      rules: this.props.store.rules
    }))

    positioning.subscribe(([line, column]) => {
      this.editor.setPosition({ lineNumber: line, column })
      this.editor.focus()
    })
  }

  componentWillUnmount () {
    this.editor.dispose()
  }

  componentWillReceiveProps ({ store: { code } }) {
    (this.editor.getModel() as monaco.editor.ITextModel).setValue(code)
  }
}
