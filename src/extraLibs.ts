import type * as monaco from 'monaco-editor'

async function fetchLib(url: string): Promise<string> {
  const response = await fetch(url)
  return response.text()
}

function addExtraLib(instance: typeof monaco, code: string, path: string) {
  instance.languages.typescript.javascriptDefaults.addExtraLib(code, path)
}

export async function loadESTree(instance: typeof monaco) {
  addExtraLib(
    instance,
    await fetchLib(
      'https://cdn.jsdelivr.net/npm/@types/estree@0.0.46/index.d.ts'
    ),
    'file:///node_modules/@types/estree/index.d.ts'
  )
}
