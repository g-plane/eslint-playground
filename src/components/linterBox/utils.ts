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
      rules: { 'playground/playground': 'error' },
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
    code: message.fix?.text,
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

const regexRuleName = /^eslint\((.+)\)/

export function registerCodeActionProvider(monacoInstance: typeof monaco) {
  monacoInstance.languages.registerCodeActionProvider('javascript', {
    provideCodeActions: (model, _range, context) => ({
      actions: context.markers
        .filter((marker) => marker.source === 'ESLint')
        .filter((marker) => marker.code)
        .map((marker) => {
          const ruleName =
            marker.relatedInformation?.[0]?.message.match(regexRuleName)?.[1] ??
            ''
          return {
            title: `Fix this ${ruleName} problem`,
            diagnostics: [marker],
            edit: {
              edits: [
                {
                  edit: {
                    text: getCodeFromMarker(marker),
                    range: marker,
                  },
                  resource: model.uri,
                },
              ],
            },
          }
        }),
      dispose: () => {},
    }),
  })
}

function getCodeFromMarker({ code }: monaco.editor.IMarkerData): string {
  return typeof code === 'string' ? code : code?.value ?? ''
}
