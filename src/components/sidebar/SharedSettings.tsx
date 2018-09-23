import { h, Component } from 'preact'
import { observer } from 'mobx-preact'
import { ConfigurationItem } from './ConfigurationItem'

interface Props {
  reactPragma: string
  onlyFilesWithFlowAnnotation: boolean
  changeReactPragma(pragma: string): void
  toggleOnlyFilesWithFlowAnnotation(): void
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
    this.changeReactPragma = this.changeReactPragma.bind(this)
  }

  onTitleClick() {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  changeReactPragma({ target }: Event) {
    const { value } = target as HTMLInputElement
    this.props.changeReactPragma(value)
  }

  render(props: Props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem title="Shared Settings" onClick={this.onTitleClick}>
          <label>
            React Pragma:
            <input
              type="text"
              value={props.reactPragma}
              onInput={this.changeReactPragma}
              style={{ marginLeft: '5px' }}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={props.onlyFilesWithFlowAnnotation}
              onChange={props.toggleOnlyFilesWithFlowAnnotation}
            />
            Only files with flow annotation
          </label>
        </ConfigurationItem>
      )
    } else {
      return (
        <ConfigurationItem
          title="Shared Settings"
          onClick={this.onTitleClick}
        />
      )
    }
  }
}
