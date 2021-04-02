import prettier from 'prettier/esm/standalone'
import parserJavaScript from 'prettier/esm/parser-babel'
import parserTypeScript from 'prettier/esm/parser-typescript'
import parserHTML from 'prettier/esm/parser-html'
import type * as monaco from 'monaco-editor'

export function format(code: string, language: string): string {
  return prettier.format(code, {
    parser: language === 'typescript' ? 'typescript' : 'babel',
    plugins: [parserJavaScript, parserTypeScript, parserHTML],
  })
}

export function registerFormattingProvider(monacoInstance: typeof monaco) {
  const disposeForJS = monacoInstance.languages.registerDocumentFormattingEditProvider(
    'javascript',
    {
      displayName: 'Prettier',
      provideDocumentFormattingEdits: (model) => {
        return [
          {
            range: model.getFullModelRange(),
            text: format(model.getValue(), 'javascript'),
          },
        ]
      },
    }
  )

  const disposeForTS = monacoInstance.languages.registerDocumentFormattingEditProvider(
    'typescript',
    {
      displayName: 'Prettier',
      provideDocumentFormattingEdits: (model) => {
        return [
          {
            range: model.getFullModelRange(),
            text: format(model.getValue(), 'typescript'),
          },
        ]
      },
    }
  )

  return () => {
    disposeForJS.dispose()
    disposeForTS.dispose()
  }
}
