import prettier from 'prettier/esm/standalone'
import type * as Prettier from 'prettier'
import parserJavaScript from 'prettier/esm/parser-babel'
import parserTypeScript from 'prettier/esm/parser-typescript'
import parserHTML from 'prettier/esm/parser-html'
import type * as monaco from 'monaco-editor'

export type PrettierOptions = Pick<
  Prettier.Options,
  'semi' | 'singleQuote' | 'tabWidth' | 'trailingComma' | 'useTabs'
>

function format(
  code: string,
  options: PrettierOptions & Pick<Prettier.Options, 'parser'>
): string {
  return prettier.format(code, {
    ...options,
    plugins: [parserJavaScript, parserTypeScript, parserHTML],
  })
}

export function registerFormattingProvider(
  monacoInstance: typeof monaco,
  options: PrettierOptions
) {
  const disposeForJS = monacoInstance.languages.registerDocumentFormattingEditProvider(
    'javascript',
    {
      displayName: 'Prettier',
      provideDocumentFormattingEdits: (model) => {
        return [
          {
            range: model.getFullModelRange(),
            text: format(model.getValue(), { ...options, parser: 'babel' }),
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
            text: format(model.getValue(), {
              ...options,
              parser: 'typescript',
            }),
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
