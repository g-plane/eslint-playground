import React, { useState } from 'react'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../../utils'

const LinterBox: React.FC = () => {
  const [code, setCode] = useState('')
  const { colorMode } = useColorMode()

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
      <Flex
        px="32px"
        py="8px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="18px">Test Case</Text>
      </Flex>
      <MonacoEditor
        height="80%"
        defaultLanguage="javascript"
        defaultPath="file:///test-case.jsx"
        theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
        options={defaultMonacoOptions}
        onMount={handleEditorDidMount}
        onChange={handleEditorValueChange}
      />
    </Box>
  )
}

export default LinterBox
