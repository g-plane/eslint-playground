import React, { useState } from 'react'
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import type * as monaco from 'monaco-editor'
import { EditorOptionsContext } from './context'
import Header from './components/Header'
import Workspace from './components/Workspace'
import GlobalSettingsModal from './components/GlobalSettingsModal'
import Footer from './components/Footer'

const theme = extendTheme({
  colors: {
    brand: '#4B32C3',
  },
  fonts: {
    body: 'Inter',
  },
})

const App: React.FC = () => {
  const [
    editorOptions,
    setEditorOptions,
  ] = useState<monaco.editor.IEditorOptions>({
    fontFamily: 'JetBrains Mono',
    fontLigatures: true,
  })
  const globalSettingsModal = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <EditorOptionsContext.Provider value={editorOptions}>
        <Header onOpenGlobalSettings={globalSettingsModal.onOpen} />
        <Workspace />
        <GlobalSettingsModal
          isOpen={globalSettingsModal.isOpen}
          onClose={globalSettingsModal.onClose}
          onEditorOptionsChange={setEditorOptions}
        />
      </EditorOptionsContext.Provider>
      <Footer />
    </ChakraProvider>
  )
}

export default App
