import React, { useState } from 'react'
import { Box } from "@chakra-ui/react";
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../utils'

const LinterBox: React.FC = () => {
  const [code, setCode] = useState('')

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editor.updateOptions(defaultEditorConfig)
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  return (
    <Box w="50%">
      <MonacoEditor
        height="80%"
        defaultLanguage="javascript"
        defaultPath="file:///main.jsx"
        options={defaultMonacoOptions}
        onMount={handleEditorDidMount}
        onChange={handleEditorValueChange}
      />
    </Box>
  )
}

export default LinterBox
