import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { ConfigurationItem } from './ConfigurationItem'
import { loadPlugin } from '../../linter'

const plugins = [
  'vue',
  'react',
  'flowtype',
  'typescript',
  'promise',
  'unicorn'
]

const Button = styled('a')`
  &:hover {
    cursor: pointer;
  }
`

interface State {
  opened: boolean
}

export default class extends Component<{}, State> {
  state = {
    opened: false
  }

  constructor (props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  render ({}, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem
          title="ESLint Plugins"
          onClick={this.onTitleClick}
        >
          {plugins.map(plugin => (
            <Button onClick={() => loadPlugin(plugin)}>
              Load eslint-plugin-{plugin}
            </Button>
          ))}
        </ConfigurationItem>
      )
    } else {
      return <ConfigurationItem
        title="ESLint Plugins"
        onClick={this.onTitleClick}
      />
    }
  }

  shouldComponentUpdate (nextProps, nextState: State) {
    if (this.state.opened !== nextState.opened) {
      return true
    } else {
      return false
    }
  }
}
