import type { Linter } from 'eslint4b'

export async function executeCode<T>(code: string): Promise<T> {
  const blob = new Blob([code], { type: 'text/javascript;charset=UTF-8' })
  const url = URL.createObjectURL(blob)

  try {
    return import(/* @vite-ignore */ url)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function lint(linter: Linter, code: string): Linter.LintMessage[] {
  return linter.verify(
    code,
    {
      parserOptions: { ecmaVersion: 2020, ecmaFeatures: { jsx: true } },
      rules: { playground: 'error' },
    },
    { filename: 'test-case.jsx' }
  )
}
