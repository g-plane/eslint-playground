import React, { useRef, useState, useContext } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  VStack,
  useColorMode,
} from '@chakra-ui/react'
import { FontFamilyContext } from '../context'
import { loadFont } from '../utils/fonts'

interface Props {
  isOpen: boolean
  onClose(): void
  onFontFamilyChange(fontFamily: string): void
}

const GlobalSettingsModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const [isLoading, setIsLoading] = useState(false)
  const originalFontFamily = useContext(FontFamilyContext)
  const [colorMode, setColorMode] = useState('light')
  const [fontFamily, setFontFamily] = useState(originalFontFamily)
  const initialFocusRef = useRef<HTMLButtonElement | null>(null)
  const {
    colorMode: originalColorMode,
    setColorMode: applyColorMode,
  } = useColorMode()

  const handleConfirm = async () => {
    applyColorMode(colorMode)

    try {
      setIsLoading(true)
      await loadFont(fontFamily)
      props.onFontFamilyChange(fontFamily)
    } catch {
      setFontFamily(originalFontFamily)
    } finally {
      setIsLoading(false)
    }

    onClose()
  }

  const handleCancel = () => {
    setColorMode(originalColorMode)
    setFontFamily(originalFontFamily)
    setIsLoading(false)
    onClose()
  }

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontFamily(event.target.value)
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
                value={fontFamily}
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
