import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../utils'
import { loadESTree, loadESLint } from '../extraLibs'

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

    editor.updateOptions(defaultEditorConfig)

    await Promise.all([loadESTree(monacoInstance), loadESLint(monacoInstance)])
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value) {
      props.onInput(value)
    }
  }

  return (
    <MonacoEditor
      height="100%"
      width="50vw"
      defaultLanguage="javascript"
      defaultPath="file:///main.jsx"
      options={defaultMonacoOptions}
      onMount={handleEditorDidMount}
      onChange={handleEditorValueChange}
    />
  )
}

export default RuleEditor
