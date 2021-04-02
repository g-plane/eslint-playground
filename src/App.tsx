import React, { useState } from 'react'
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import type * as monaco from 'monaco-editor'
import { EditorOptionsContext, PrettierOptionsContext } from './context'
import type { PrettierOptions } from './utils/prettier'
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
    fontSize: 16,
    lineHeight: 24,
  })
  const [prettierOptions, setPrettierOptions] = useState<PrettierOptions>({
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    useTabs: false,
  })
  const globalSettingsModal = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
      <EditorOptionsContext.Provider value={editorOptions}>
        <PrettierOptionsContext.Provider value={prettierOptions}>
          <Header onOpenGlobalSettings={globalSettingsModal.onOpen} />
          <Workspace />
          <GlobalSettingsModal
            isOpen={globalSettingsModal.isOpen}
            onClose={globalSettingsModal.onClose}
            onEditorOptionsChange={setEditorOptions}
            onPrettierOptionsChange={setPrettierOptions}
          />
        </PrettierOptionsContext.Provider>
      </EditorOptionsContext.Provider>
      <Footer />
    </ChakraProvider>
  )
}

export default App
