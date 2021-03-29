import React, { useRef } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose(): void
}

const GlobalSettingsModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const initialFocusRef = useRef<HTMLButtonElement | null>(null)

  const handleConfirm = () => {
    //
  }

  const handleCancel = () => {
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
        <ModalBody></ModalBody>
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
