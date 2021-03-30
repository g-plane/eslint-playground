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
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  initialOptions: Options
  onClose(): void
  onConfirm(options: Options): void
}

export interface Options {
  language: string
}

const SettingsModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, onConfirm, initialOptions } = props

  const [language, setLanguage] = useState(initialOptions.language)
  const initialFocusRef = useRef<HTMLButtonElement | null>(null)

  const handleConfirm = () => {
    onConfirm({
      language,
    })
    onClose()
  }

  const handleCancel = () => {
    setLanguage(initialOptions.language)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      initialFocusRef={initialFocusRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rule Definition Editor Settings</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <ModalBody>
          <FormControl>
            <FormLabel>Language</FormLabel>
            <RadioGroup value={language} onChange={setLanguage}>
              <HStack spacing="24px">
                <Radio value="javascript">JavaScript</Radio>
                <Radio value="typescript">TypeScript</Radio>
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

export default SettingsModal
