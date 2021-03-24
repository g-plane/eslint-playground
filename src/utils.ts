import type * as monaco from 'monaco-editor'

export const defaultMonacoOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 15,
  lineHeight: 24,
  fontFamily: '"Cascadia Code", "JetBrains Mono", Monaco, Consolas, monospace',
}

export const defaultEditorConfig: monaco.editor.IEditorOptions &
  monaco.editor.IGlobalEditorOptions = {
  insertSpaces: true,
  tabSize: 2,
  trimAutoWhitespace: true,
  renderWhitespace: 'trailing',
}
