import { h, Component } from 'preact'
import { observer } from 'mobx-preact'
import { ConfigurationItem } from './ConfigurationItem'

const parsers = [
  'espree',
  'babel-eslint',
  'typescript-eslint-parser',
  'vue-eslint-parser'
]

interface Props {
  currentParser: string,
  onChange (event: Event): void
}

interface State {
  opened: boolean
}

@observer
export default class extends Component<Props, State> {
  state = {
    opened: true
  }

  constructor (props: Props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  render (
    { currentParser, onChange }: Props,
    { opened }: State
  ) {
    if (this.state.opened) {
      return (
        <ConfigurationItem onClick={this.onTitleClick} title="Parser">
          {parsers.map(parser => (
            <label>
              <input
                type="radio"
                name="parser"
                value={parser}
                checked={parser === currentParser}
                onChange={onChange}
              />
              &nbsp;{parser}
            </label>
          ))}
        </ConfigurationItem>
      )
    } else {
      return <ConfigurationItem onClick={this.onTitleClick} title="Parser" />
    }
  }
}
