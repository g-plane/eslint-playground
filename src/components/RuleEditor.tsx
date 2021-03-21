import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { loadESTree, loadESLint } from '../extraLibs'

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 15,
  lineHeight: 24,
  fontFamily: '"Cascadia Code", "JetBrains Mono", Monaco, Consolas, monospace',
}

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

    await Promise.all([loadESTree(monacoInstance), loadESLint(monacoInstance)])
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
      options={options}
      onMount={handleEditorDidMount}
      onChange={handleEditorValueChange}
    />
  )
}

export default RuleEditor
