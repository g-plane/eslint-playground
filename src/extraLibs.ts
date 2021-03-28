import type * as monaco from 'monaco-editor'

async function fetchLib(url: string): Promise<string> {
  const response = await fetch(url)
  return response.text()
}

function addExtraLib(instance: typeof monaco, code: string, path: string) {
  instance.languages.typescript.javascriptDefaults.addExtraLib(code, path)
  instance.languages.typescript.typescriptDefaults.addExtraLib(code, path)
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

export async function loadESLint(instance: typeof monaco) {
  addExtraLib(
    instance,
    await fetchLib(
      'https://cdn.jsdelivr.net/npm/@types/eslint@7.2.7/index.d.ts'
    ),
    'file:///node_modules/@types/eslint/index.d.ts'
  )
}

export async function loadReact(instance: typeof monaco) {
  addExtraLib(
    instance,
    await fetchLib(
      'https://cdn.jsdelivr.net/npm/@types/react@17.0.3/index.d.ts'
    ),
    'file:///node_modules/@types/react/index.d.ts'
  )

  addExtraLib(
    instance,
    await fetchLib(
      'https://cdn.jsdelivr.net/npm/@types/react@17.0.3/global.d.ts'
    ),
    'file:///node_modules/@types/react@17.0.3/global.d.ts'
  )
}
