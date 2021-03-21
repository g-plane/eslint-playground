import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { loadESTree } from '../extraLibs'

interface Props {
  onInput(code: string): void
}

const RuleEditor: React.FC<Props> = (props) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    editorRef.current = editor

    editor.updateOptions({
      insertSpaces: true,
      tabSize: 2,
      trimAutoWhitespace: true,
      renderWhitespace: 'trailing',
    })

    await loadESTree(monacoInstance)
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value) {
      props.onInput(value)
    }
  }

  return (
    <MonacoEditor
      height="calc(100vh - 80px)"
      width="50vw"
      defaultLanguage="javascript"
      defaultPath="file:///main.jsx"
      onMount={handleEditorDidMount}
      onChange={handleEditorValueChange}
    />
  )
}

export default RuleEditor
