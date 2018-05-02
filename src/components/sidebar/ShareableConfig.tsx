import { h, Component } from 'preact'
import { css } from 'preact-emotion'
import { observer } from 'mobx-preact'
import { Linter } from 'eslint'
import { ConfigurationItem } from './ConfigurationItem'

const shareables = [
  'eslint-config-standard',
  'eslint-config-xo',
]

const hover = css`
  &:hover {
    cursor: pointer;
  }
`

interface Props {
  applyRules (rules: Linter.Config['rules']): void
}

interface State {
  opened: boolean
}

@observer
export default class extends Component<Props, State> {
  state = {
    opened: false
  }

  constructor (props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.useConfig = this.useConfig.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  async useConfig (name: string) {
    let config: Linter.Config
    switch (name) {
    case 'eslint-config-standard':
      config = await import('eslint-config-standard')
      break
    case 'eslint-config-xo':
      config = await import('eslint-config-xo')
      break
    default:
      return
    }
    this.props.applyRules(config.rules)
  }

  render (props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem
          title="Shareable Configs"
          onClick={this.onTitleClick}
        >
          {shareables.map(name => (
            <div class={hover} onClick={() => this.useConfig(name)}>
              Use {name}
            </div>
          ))}
        </ConfigurationItem>
      )
    } else {
      return <ConfigurationItem
        title="Shareable Configs"
        onClick={this.onTitleClick}
      />
    }
  }
}
