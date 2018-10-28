import { h, render } from 'preact'
import styled from 'preact-emotion'
import { observer, Provider } from 'mobx-preact'
import store from './store'
import Header from './components/Header'
import Configuration from './components/sidebar/Configuration'
import Editor from './components/Editor'
import Reports from './components/Reports'

const AppFrame = styled('div')`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
  min-height: 100vh;
`

const AppBody = styled('div')`
  display: flex;
  flex-grow: 1;
  min-height: 0;
`

const Workspace = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = observer(() => (
  <AppFrame>
    <Header />
    <AppBody>
      <Configuration />
      <Workspace>
        <Editor />
        <Reports />
      </Workspace>
    </AppBody>
  </AppFrame>
))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)
