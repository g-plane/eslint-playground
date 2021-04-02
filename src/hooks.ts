import { useEffect, useContext } from 'react'
import type { MutableRefObject } from 'react'
import type * as monaco from 'monaco-editor'
import { EditorOptionsContext, PrettierOptionsContext } from './context'

export function useEditorOptions(
  ref: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
): void {
  const editorOptions = useContext(EditorOptionsContext)
  const prettierOptions = useContext(PrettierOptionsContext)

  useEffect(() => {
    ref.current?.updateOptions({
      ...editorOptions,
      fontFamily: `"${editorOptions.fontFamily}", monospace`,
      detectIndentation: false,
      tabSize: prettierOptions.tabWidth,
      insertSpaces: !prettierOptions.useTabs,
    })
  }, [editorOptions, prettierOptions])
}
