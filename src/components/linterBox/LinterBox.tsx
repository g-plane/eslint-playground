import React, { useState, useRef, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Linter from 'eslint4b'
import type { Rule } from 'eslint4b'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import MonacoEditor, { useMonaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { useEditorOptions } from '../../hooks'
import { defaultMonacoOptions, defaultEditorConfig } from '../../utils'
import { registerFormattingProvider } from '../../utils/prettier'
import {
  executeCode,
  lint,
  convertLintMessagesToEditorMarkers,
  registerCodeActionProvider,
} from './utils'
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
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoInstance = useMonaco()
  const { colorMode } = useColorMode()
  useEditorOptions(editorRef)

  const linter = getLinter(linterRef)

  useEffect(() => setMessages(lint(linter, code)), [code])

  useEffect(() => {
    const model = editorRef.current?.getModel()
    if (model) {
      const markers = convertLintMessagesToEditorMarkers(messages)
      monacoInstance?.editor.setModelMarkers(model, 'eslint', markers)
    }
  }, [messages])

  useEffect(() => {
    if (monacoInstance) {
      const disposable = registerCodeActionProvider(monacoInstance)

      return () => disposable.dispose()
    }
  }, [monacoInstance])

  useEffect(() => {
    if (monacoInstance) {
      const disposable = registerFormattingProvider(monacoInstance)

      return disposable
    }
  }, [monacoInstance])

  useDebounce(
    async () => {
      try {
        const { default: rule } = await executeCode<{
          default: Rule.RuleModule
        }>(ruleSource)
        linter.defineRule('playground/playground', rule)

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
    editorRef.current = editor
    editor.updateOptions(defaultEditorConfig)
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  const handleMessageClick = (message: Linter.LintMessage) => {
    const editor = editorRef.current
    if (editor) {
      editor.setPosition({
        lineNumber: message.line,
        column: message.column,
      })
      editor.focus()
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
      <Box h="calc(80vh - 140px)">
        <MonacoEditor
          defaultLanguage="javascript"
          defaultPath="file:///test-case.jsx"
          theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
          options={defaultMonacoOptions}
          onMount={handleEditorDidMount}
          onChange={handleEditorValueChange}
        />
      </Box>
      <MessagesPanel messages={messages} onMessageClick={handleMessageClick} />
    </Box>
  )
}

export default LinterBox
