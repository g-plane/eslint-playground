import { useEffect, useContext } from 'react'
import type { MutableRefObject } from 'react'
import type * as monaco from 'monaco-editor'
import { EditorOptionsContext } from './context'

export function useEditorOptions(
  ref: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
): void {
  const editorOptions = useContext(EditorOptionsContext)

  useEffect(() => {
    ref.current?.updateOptions({
      ...editorOptions,
      fontFamily: `"${editorOptions.fontFamily}", monospace`,
    })
  }, [editorOptions])
}
