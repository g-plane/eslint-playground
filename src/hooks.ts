import { useEffect, useContext } from 'react'
import type { MutableRefObject } from 'react'
import type * as monaco from 'monaco-editor'
import { FontFamilyContext } from './context'

export function useFontFamily(
  ref: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
): void {
  const fontFamily = useContext(FontFamilyContext)

  useEffect(() => {
    ref.current?.updateOptions({ fontFamily })
  }, [fontFamily])
}
