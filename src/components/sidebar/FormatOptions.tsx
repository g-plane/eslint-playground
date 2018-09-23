import { h, Component } from 'preact'
import { observer } from 'mobx-preact'
import { ConfigurationItem } from './ConfigurationItem'

interface Props {
  indent: {
    type: 'space' | 'tab',
    size: number
  }
  changeIndentType(type: 'space' | 'tab'): void
  changeIndentSize(size: number): void
}

interface State {
  opened: boolean
}

@observer
export default class extends Component<Props, State> {
  state = {
    opened: false
  }

  constructor(props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.changeIndentType = this.changeIndentType.bind(this)
    this.changeIndentSize = this.changeIndentSize.bind(this)
  }

  onTitleClick() {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  changeIndentType({ target }: Event) {
    const { value } = target as HTMLSelectElement
    if (value === 'space' || value === 'tab') {
      this.props.changeIndentType(value)
    }
  }

  changeIndentSize({ target }: Event) {
    const { value } = target as HTMLInputElement
    this.props.changeIndentSize(+value)
  }

  render({ indent }: Props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem title="Format Options" onClick={this.onTitleClick}>
          <div>
            Indent type:
            <select onChange={this.changeIndentType}>
              <option value="space">Space</option>
              <option value="tab">Tab</option>
            </select>
          </div>
          <label>
            Indent size:
            <input
              type="number"
              value={indent.size}
              onInput={this.changeIndentSize}
            />
          </label>
        </ConfigurationItem>
      )
    } else {
      return (
        <ConfigurationItem
          title="Format Options"
          onClick={this.onTitleClick}
        />
      )
    }
  }
}
