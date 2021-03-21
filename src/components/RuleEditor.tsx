import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'

interface Props {
  onInput(code: string): void
}

const RuleEditor: React.FC<Props> = (props) => {
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editor.updateOptions({
      insertSpaces: true,
      tabSize: 2,
      trimAutoWhitespace: true,
      renderWhitespace: 'trailing',
    })
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
      onMount={handleEditorDidMount}
      onChange={handleEditorValueChange}
    />
  )
}

export default RuleEditor
