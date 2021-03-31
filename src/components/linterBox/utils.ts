import type { Linter } from 'eslint4b'
import * as monaco from 'monaco-editor'

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

export function convertLintMessagesToEditorMarkers(
  messages: Linter.LintMessage[]
): monaco.editor.IMarkerData[] {
  return messages.map((message) => ({
    source: 'ESLint',
    message: message.message,
    severity:
      message.severity === 1
        ? monaco.MarkerSeverity.Warning
        : monaco.MarkerSeverity.Error,
    startLineNumber: message.line ?? 1,
    startColumn: message.column ?? 1,
    endLineNumber: message.endLine ?? 1,
    endColumn: message.endColumn ?? 1,
    relatedInformation: [
      {
        startLineNumber: message.line ?? 1,
        startColumn: message.column ?? 1,
        endLineNumber: message.endLine ?? 1,
        endColumn: message.endColumn ?? 1,
        message: message.ruleId ? `eslint(${message.ruleId})` : '',
        resource: monaco.Uri.parse('file:///test-case.jsx'),
      },
    ],
  }))
}
