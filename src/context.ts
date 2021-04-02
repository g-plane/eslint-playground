import * as React from 'react'
import type * as monaco from 'monaco-editor'
import type { PrettierOptions } from './utils/prettier'

export const EditorOptionsContext = React.createContext<monaco.editor.IEditorOptions>(
  {
    fontFamily: 'JetBrains Mono',
    fontLigatures: true,
  }
)
EditorOptionsContext.displayName = 'EditorOptionsContext'

export const PrettierOptionsContext = React.createContext<PrettierOptions>({
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
})
PrettierOptionsContext.displayName = 'PrettierOptionsContext'
