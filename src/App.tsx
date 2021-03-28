import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from './components/Header'
import Workspace from './components/Workspace'

const theme = extendTheme({
  colors: {
    brand: '#4B32C3',
  },
})

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Workspace />
    </ChakraProvider>
  )
}

export default App
