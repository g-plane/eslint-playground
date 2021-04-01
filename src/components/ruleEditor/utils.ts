import type * as monaco from 'monaco-editor'

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
