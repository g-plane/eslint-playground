import React from 'react'
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import Header from './components/Header'
import Workspace from './components/Workspace'
import GlobalSettingsModal from './components/GlobalSettingsModal'

const theme = extendTheme({
  colors: {
    brand: '#4B32C3',
  },
})

const App: React.FC = () => {
  const globalSettingsModal = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <Header onOpenGlobalSettings={globalSettingsModal.onOpen} />
      <Workspace />
      <GlobalSettingsModal
        isOpen={globalSettingsModal.isOpen}
        onClose={globalSettingsModal.onClose}
      />
    </ChakraProvider>
  )
}

export default App
