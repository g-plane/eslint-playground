import * as React from 'react'
import type * as monaco from 'monaco-editor'

export const EditorOptionsContext = React.createContext<monaco.editor.IEditorOptions>(
  {
    fontFamily: 'JetBrains Mono',
    fontLigatures: true,
  }
)
EditorOptionsContext.displayName = 'EditorOptionsContext'
