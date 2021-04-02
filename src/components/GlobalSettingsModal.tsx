import React, { useRef, useState, useContext } from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  VStack,
  useColorMode,
} from '@chakra-ui/react'
import type * as monaco from 'monaco-editor'
import { EditorOptionsContext, PrettierOptionsContext } from '../context'
import { loadFont } from '../utils/fonts'
import type { PrettierOptions } from '../utils/prettier'

interface Props {
  isOpen: boolean
  onClose(): void
  onEditorOptionsChange(options: monaco.editor.IEditorOptions): void
  onPrettierOptionsChange(options: PrettierOptions): void
}

const GlobalSettingsModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const [isLoading, setIsLoading] = useState(false)
  const originalEditorOptions = useContext(EditorOptionsContext)
  const [colorMode, setColorMode] = useState('light')
  const [editorOptions, setEditorOptions] = useState(originalEditorOptions)
  const originalPrettierOptions = useContext(PrettierOptionsContext)
  const [prettierOptions, setPrettierOptions] = useState(
    originalPrettierOptions
  )
  const initialFocusRef = useRef<HTMLButtonElement | null>(null)
  const {
    colorMode: originalColorMode,
    setColorMode: applyColorMode,
  } = useColorMode()

  const handleConfirm = async () => {
    applyColorMode(colorMode)

    props.onPrettierOptionsChange(prettierOptions)

    try {
      setIsLoading(true)
      await loadFont(editorOptions.fontFamily!)
      props.onEditorOptionsChange(editorOptions)
    } catch {
      setEditorOptions({
        ...editorOptions,
        fontFamily: originalEditorOptions.fontFamily,
      })
    } finally {
      setIsLoading(false)
    }

    onClose()
  }

  const handleCancel = () => {
    setColorMode(originalColorMode)
    setEditorOptions(originalEditorOptions)
    setPrettierOptions(originalPrettierOptions)
    setIsLoading(false)
    onClose()
  }

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditorOptions((options) => ({
      ...options,
      fontFamily: event.target.value,
    }))
  }

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorOptions((options) => ({
      ...options,
      fontSize: Number.parseFloat(event.target.value) || undefined,
    }))
  }

  const handleLineHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditorOptions((options) => ({
      ...options,
      lineHeight: Number.parseFloat(event.target.value) || undefined,
    }))
  }

  const handleSemiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrettierOptions((options) => ({
      ...options,
      semi: event.target.checked,
    }))
  }

  const handleSingleQuoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrettierOptions((options) => ({
      ...options,
      singleQuote: event.target.checked,
    }))
  }

  const handleTabWidthChange = (_: string, value: number) => {
    setPrettierOptions((options) => ({
      ...options,
      tabWidth: value,
    }))
  }

  const handleTrailingCommaChange = (value: string) => {
    setPrettierOptions((options) => ({
      ...options,
      trailingComma: value as PrettierOptions['trailingComma'],
    }))
  }

  const handleUseTabsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrettierOptions((options) => ({
      ...options,
      useTabs: event.target.checked,
    }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size="xl"
      isCentered
      initialFocusRef={initialFocusRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Global Settings</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <ModalBody>
          <VStack spacing="12px">
            <FormControl>
              <FormLabel>Color Mode</FormLabel>
              <RadioGroup value={colorMode} onChange={setColorMode}>
                <HStack spacing="24px">
                  <Radio value="light">Light</Radio>
                  <Radio value="dark">Dark</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Font Family</FormLabel>
              <Select
                size="sm"
                value={editorOptions.fontFamily}
                onChange={handleFontFamilyChange}
              >
                <option value="Cascadia Code">Cascadia Code</option>
                <option value="Consolas">Consolas</option>
                <option value="Fira Code">Fira Code</option>
                <option value="Inconsolata">Inconsolata</option>
                <option value="JetBrains Mono">JetBrains Mono</option>
                <option value="Monaco">Monaco</option>
                <option value="Mononoki">Mononoki</option>
                <option value="PT Mono">PT Mono</option>
                <option value="Roboto Mono">Roboto Mono</option>
                <option value="SF Mono">SF Mono</option>
                <option value="Source Code Pro">Source Code Pro</option>
                <option value="Victor Mono">Victor Mono</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Font Size</FormLabel>
              <Input
                value={editorOptions.fontSize}
                onChange={handleFontSizeChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Line Height</FormLabel>
              <Input
                value={editorOptions.lineHeight}
                onChange={handleLineHeightChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prettier</FormLabel>
              <HStack spacing="24px">
                <Checkbox
                  isChecked={prettierOptions.semi}
                  onChange={handleSemiChange}
                >
                  Semi
                </Checkbox>
                <Checkbox
                  isChecked={prettierOptions.singleQuote}
                  onChange={handleSingleQuoteChange}
                >
                  Single Quote
                </Checkbox>
                <Checkbox
                  isChecked={prettierOptions.useTabs}
                  onChange={handleUseTabsChange}
                >
                  Use Tabs
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Prettier - Tab Width</FormLabel>
              <NumberInput
                value={prettierOptions.tabWidth}
                min={0}
                onChange={handleTabWidthChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Prettier - Trailing Comma</FormLabel>
              <RadioGroup
                value={prettierOptions.trailingComma}
                onChange={handleTrailingCommaChange}
              >
                <HStack spacing="24px">
                  <Radio value="none">None</Radio>
                  <Radio value="es5">ES5</Radio>
                  <Radio value="all">All</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={isLoading}
            ref={initialFocusRef}
            onClick={handleConfirm}
          >
            {isLoading ? <Spinner /> : 'OK'}
          </Button>
          <Button onClick={handleCancel}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GlobalSettingsModal
