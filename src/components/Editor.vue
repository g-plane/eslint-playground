<template>
  <div ref="monaco" class="monaco-container" />
</template>

<script>
import * as monaco from 'monaco-editor'
import * as emitter from '../events'
import * as state from '../state'

monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSyntaxValidation: true
})

const codeActionProvider = {
  provideCodeActions: (textModel, range, context) => context.markers
    .filter(marker => marker.source === 'eslint')
    .filter(({ relatedInformation }) => relatedInformation)
    .map(problem => {
      const fix = problem.relatedInformation[0]
      return {
        title: `Fix this ${fix.message} problem`,
        diagnostics: [problem],
        edit: {
          edits: [
            {
              resource: textModel.uri,
              edits: [
                {
                  text: problem.code,
                  range: fix
                }
              ]
            }
          ]
        }
      }
    })
}
monaco.languages.registerCodeActionProvider('javascript', codeActionProvider)
monaco.languages.registerCodeActionProvider('typescript', codeActionProvider)
monaco.languages.registerCodeActionProvider('html', codeActionProvider)

export default {
  name: 'Editor',
  data() {
    return {
      /** @type {monaco.editor.IStandaloneCodeEditor} */
      editor: null,
      serializedState: location.hash.slice(1)
    }
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.monaco, {
      language: 'javascript',
      fontSize: 14,
      value: this.$store.state.code,
      smoothScrolling: true,
      lightbulb: {
        enabled: true
      }
    })

    const model = this.editor.getModel()
    model.onDidChangeContent(() => {
      const code = model.getValue()
      this.$store.commit('updateCode', code)

      const hash = state.serialize({ code })
      this.serializedState = hash
      location.replace(`#${hash}`)
    })
    model.updateOptions({
      insertSpaces: true,
      tabSize: 2
    })

    emitter.on('indent-update', options => model.updateOptions({
      insertSpaces: options.type === 'space',
      tabSize: options.size
    }))

    emitter.on(
      'font-size-change',
      fontSize => this.editor.updateOptions({ fontSize })
    )

    emitter.on(
      'font-family-change',
      fontFamily => this.editor.updateOptions({ fontFamily })
    )

    emitter.on('editor-locate', ({ line, column }) => {
      this.editor.setPosition({ lineNumber: line, column })
      this.editor.focus()
    })

    emitter.on('theme-change', theme => monaco.editor.setTheme(theme))

    emitter.on('fixable', reports => {
      monaco.editor.setModelMarkers(
        model,
        'eslint',
        reports.map(report => ({
          startLineNumber: report.startLine,
          startColumn: report.startColumn,
          endLineNumber: report.endLine,
          endColumn: report.endColumn,
          severity:
            report.severity === 2
              ? monaco.MarkerSeverity.Error
              : monaco.MarkerSeverity.Warning,
          owner: 'eslint',
          message: report.rule
            ? `${report.message} (${report.rule})`
            : `${report.message}`,
          code: report.fix ? report.fix.text : undefined,
          source: 'eslint',
          relatedInformation: report.fix
            ? [
              {
                startLineNumber: model.getPositionAt(report.fix.range[0])
                  .lineNumber,
                startColumn: model.getPositionAt(report.fix.range[0])
                  .column,
                endLineNumber: model.getPositionAt(report.fix.range[1])
                  .lineNumber,
                endColumn: model.getPositionAt(report.fix.range[1]).column,
                message: report.rule,
                resource: model.uri
              }
            ]
            : undefined
        }))
      )
    })

    this.$store.watch(
      state => state.eslint.parser,
      parser => {
        if (parser === 'typescript-eslint-parser') {
          monaco.editor.setModelLanguage(model, 'typescript')
        } else if (parser === 'vue-eslint-parser') {
          monaco.editor.setModelLanguage(model, 'html')
        } else {
          monaco.editor.setModelLanguage(model, 'javascript')
        }
      }
    )

    window.addEventListener('hashchange', this.onHashChange)

    const { code } = state.deserialize(this.serializedState)
    this.editor.setValue(code || this.$store.state.code)
  },
  beforeDestroy() {
    this.editor.dispose()
    window.removeEventListener('hashchange', this.onHashChange)
  },
  methods: {
    onHashChange() {
      const fromUrl = location.hash.slice(1)
      if (fromUrl !== this.serializedState) {
        const { code } = state.deserialize(fromUrl)
        this.$store.commit('updateCode', code)
        this.editor.setValue(code)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.monaco-container
  border-bottom 1px solid #ccc
  height 70vh
</style>
