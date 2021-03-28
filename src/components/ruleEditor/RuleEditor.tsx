import React, { useRef, useState } from 'react'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { VscSettingsGear } from 'react-icons/vsc'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../../utils'
import { loadESTree, loadESLint } from '../../extraLibs'
import SettingsModal from './SettingsModal'
import type { Options } from './SettingsModal'

interface Props {
  code: string
  onInput(code: string): void
}

const RuleEditor: React.FC<Props> = (props) => {
  const [language, setLanguage] = useState('javascript')
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleEditorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    editorRef.current = editor

    editor.updateOptions(defaultEditorConfig)

    await Promise.all([loadESTree(monacoInstance), loadESLint(monacoInstance)])
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value !== undefined) {
      props.onInput(value)
    }
  }

  const handleSettingsModalConfirm = (options: Options) => {
    setLanguage(options.language)
  }

  const fileExtension = language === 'typescript' ? 'tsx' : 'jsx'
  const path = `file:///rule.${fileExtension}`

  const initialModalOptions: Options = {
    language,
  }

  return (
    <Box w="50%">
      <Flex
        px="32px"
        py="8px"
        bg="gray.200"
        alignItems="center"
        justifyContent="space-between"
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
      <MonacoEditor
        value={props.code}
        language={language}
        defaultLanguage="javascript"
        path={path}
        defaultPath="file:///rule.jsx"
        options={defaultMonacoOptions}
        onMount={handleEditorDidMount}
        onChange={handleEditorValueChange}
      />
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
