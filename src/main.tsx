import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App'

const theme = extendTheme({
  colors: {
    brand: '#4B32C3',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
