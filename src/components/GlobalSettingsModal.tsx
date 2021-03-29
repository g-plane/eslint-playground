import React, { useRef, useState } from 'react'
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
  useColorMode,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose(): void
}

const GlobalSettingsModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const [colorMode, setColorMode] = useState('light')
  const initialFocusRef = useRef<HTMLButtonElement | null>(null)
  const {
    colorMode: originalColorMode,
    setColorMode: applyColorMode,
  } = useColorMode()

  const handleConfirm = () => {
    applyColorMode(colorMode)
    onClose()
  }

  const handleCancel = () => {
    setColorMode(originalColorMode)
    onClose()
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
          <FormControl>
            <FormLabel>Color Mode</FormLabel>
            <RadioGroup value={colorMode} onChange={setColorMode}>
              <HStack spacing="24px">
                <Radio value="light">Light</Radio>
                <Radio value="dark">Dark</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            ref={initialFocusRef}
            onClick={handleConfirm}
          >
            OK
          </Button>
          <Button onClick={handleCancel}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GlobalSettingsModal
