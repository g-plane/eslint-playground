import React, { useState } from 'react'
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import { FontFamilyContext } from './context'
import Header from './components/Header'
import Workspace from './components/Workspace'
import GlobalSettingsModal from './components/GlobalSettingsModal'

const theme = extendTheme({
  colors: {
    brand: '#4B32C3',
  },
  fonts: {
    body: 'Inter',
  },
})

const App: React.FC = () => {
  const [fontFamily, setFontFamily] = useState('JetBrains Mono')
  const globalSettingsModal = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <FontFamilyContext.Provider value={fontFamily}>
        <Header onOpenGlobalSettings={globalSettingsModal.onOpen} />
        <Workspace />
        <GlobalSettingsModal
          isOpen={globalSettingsModal.isOpen}
          onClose={globalSettingsModal.onClose}
          onFontFamilyChange={setFontFamily}
        />
      </FontFamilyContext.Provider>
    </ChakraProvider>
  )
}

export default App
