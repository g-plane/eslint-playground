import { h, Component } from 'preact'
import { observer } from 'mobx-preact'
import { Linter } from 'eslint'
import { ConfigurationItem } from './ConfigurationItem'

const parsers = [
  'espree',
  'babel-eslint',
  'typescript-eslint-parser'
]

interface Props {
  currentParser: string
  updateParserOptions (options: Linter.ParserOptions): void
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
    this.changeParser = this.changeParser.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  changeParser ({ target }: Event) {
    const { value } = target as HTMLSelectElement
    this.props.updateParserOptions({ parser: value })
  }

  render (props: Props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem title="Parser Options" onClick={this.onTitleClick}>
          <div>
            Parser:
            <select
              disabled={props.currentParser !== 'vue-eslint-parser'}
              onChange={this.changeParser}
              style={{ marginLeft: '5px' }}
            >
              {parsers.map(parser => (
                <option value={parser}>{parser}</option>
              ))}
            </select>
            <br />
            (Only available when using "vue-eslint-parser")
          </div>
        </ConfigurationItem>
      )
    } else {
      return (
        <ConfigurationItem
          title="Parser Options"
          onClick={this.onTitleClick}
        />
      )
    }
  }
}
