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
  minimap: { enabled: false },
}

export async function getRunnableCode(
  instance: typeof monaco,
  { source, language, path }: { source: string; language: string; path: string }
): Promise<string> {
  if (language === 'typescript') {
    const getWorker = await instance.languages.typescript.getTypeScriptWorker()
    const worker = await getWorker(instance.Uri.parse(path))
    const output = await worker.getEmitOutput(path)
    const [file] = output.outputFiles
    if (file) {
      return file.text
    } else {
      return source
    }
  } else {
    return source
  }
}
