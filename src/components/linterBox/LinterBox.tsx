import React, { useState, useRef, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Linter from 'eslint4b'
import type { Rule } from 'eslint4b'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../../utils'
import { executeCode, lint } from './utils'
import MessagesPanel from './MessagesPanel'

function getLinter(ref: React.MutableRefObject<Linter | null>): Linter {
  if (!ref.current) {
    ref.current = new Linter()
  }

  return ref.current
}

interface Props {
  ruleSource: string
}

const LinterBox: React.FC<Props> = (props) => {
  const { ruleSource } = props

  const [code, setCode] = useState('')
  const [messages, setMessages] = useState<Linter.LintMessage[]>([])
  const linterRef = useRef<Linter | null>(null)
  const { colorMode } = useColorMode()

  const linter = getLinter(linterRef)

  useDebounce(
    async () => {
      try {
        const { default: rule } = await executeCode<{
          default: Rule.RuleModule
        }>(ruleSource)
        linter.defineRule('playground', rule)

        setMessages(lint(linter, code))
      } catch (error) {
        setMessages([
          {
            ruleId: null,
            fatal: true,
            severity: 2,
            message: error.message,
            line: 1,
            column: 1,
          },
        ])
      }
    },
    100,
    [ruleSource]
  )

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

  useEffect(() => setMessages(lint(linter, code)), [code])

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
      <Box h="calc(80vh - 132px)">
        <MonacoEditor
          defaultLanguage="javascript"
          defaultPath="file:///test-case.jsx"
          theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
          options={defaultMonacoOptions}
          onMount={handleEditorDidMount}
          onChange={handleEditorValueChange}
        />
      </Box>
      <MessagesPanel messages={messages} />
    </Box>
  )
}

export default LinterBox
