import React, { useRef, useState, useEffect } from 'react'
import { useAsync } from 'react-use'
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { VscSettingsGear } from 'react-icons/vsc'
import MonacoEditor, { useMonaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../../utils'
import { registerFormattingProvider } from '../../utils/prettier'
import { loadESTree, loadESLint } from '../../extraLibs'
import { useEditorOptions } from '../../hooks'
import { getRunnableCode } from './utils'
import { defaultRuleInJS, defaultRuleInTS } from './snippets'
import SettingsModal from './SettingsModal'
import type { Options } from './SettingsModal'

interface Props {
  onInput(code: string): void
}

const RuleEditor: React.FC<Props> = (props) => {
  const [code, setCode] = useState(defaultRuleInJS)
  const [language, setLanguage] = useState('javascript')
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const monacoInstance = useMonaco()
  useEditorOptions(editorRef)

  const fileExtension = language === 'typescript' ? 'tsx' : 'jsx'
  const path = `file:///rule.${fileExtension}`

  useEffect(() => {
    const editor = editorRef.current
    if (editor) {
      if (language === 'typescript' && code === defaultRuleInJS) {
        editor.setValue(defaultRuleInTS)
      } else if (language === 'javascript' && code === defaultRuleInTS) {
        editor.setValue(defaultRuleInJS)
      } else {
        editor.setValue(code)
      }
    }
  }, [language])

  useAsync(async () => {
    if (monacoInstance) {
      props.onInput(
        await getRunnableCode(monacoInstance, {
          source: code,
          language,
          path,
        })
      )
    }
  }, [code, language])

  const handleEditorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    editorRef.current = editor

    editor.updateOptions(defaultEditorConfig)
    registerFormattingProvider(monacoInstance)
    await Promise.all([loadESTree(monacoInstance), loadESLint(monacoInstance)])
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleSettingsModalConfirm = (options: Options) => {
    setLanguage(options.language)
  }

  const initialModalOptions: Options = {
    language,
  }

  return (
    <Box w="50%">
      <Flex
        px="32px"
        py="8px"
        alignItems="center"
        justifyContent="space-between"
        borderRightWidth="thin"
        borderRightColor="gray.300"
      >
        <Text fontSize="18px">Rule Definition</Text>
        <IconButton
          size="sm"
          variant="outline"
          icon={<VscSettingsGear />}
          aria-label="Settings"
          onClick={onOpen}
        />
      </Flex>
      <Box
        h="calc(100vh - 140px)"
        borderRightWidth="thin"
        borderRightColor="gray.300"
      >
        <MonacoEditor
          value={code}
          language={language}
          defaultLanguage="javascript"
          path={path}
          defaultPath="file:///rule.jsx"
          theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
          options={defaultMonacoOptions}
          onMount={handleEditorDidMount}
          onChange={handleEditorValueChange}
        />
      </Box>
      <SettingsModal
        isOpen={isOpen}
        initialOptions={initialModalOptions}
        onClose={onClose}
        onConfirm={handleSettingsModalConfirm}
      />
    </Box>
  )
}

export default RuleEditor
