import { h, Component } from 'preact'
import { css } from 'preact-emotion'
import { observer } from 'mobx-preact'
import { ConfigurationItem } from './ConfigurationItem'
import * as eslint from 'eslint'
import { getRules, loadingProcess } from '../../linter'

const serverityStyle = css`
  padding-left: 2px;
  padding-right: 4px;
`

interface Props {
  rules: NonNullable<eslint.Linter.Config['rules']>
  onSeverityChange (ruleId: string, severity: eslint.Linter.Severity): void
}

interface State {
  opened: boolean
  availableRules: Map<string, eslint.Rule.RuleModule>
}

@observer
export default class extends Component<Props, State> {
  state = {
    opened: false,
    availableRules: getRules()
  }

  constructor (props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.switchSeverity = this.switchSeverity.bind(this)
    loadingProcess.subscribe(message => {
      if (message === 'plugin-loaded') {
        this.setState({ availableRules: getRules() })
      }
    })
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  switchSeverity (rule: string, { target }: Event) {
    const { value } = target as HTMLSelectElement
    this.props.onSeverityChange(
      rule,
      Number.parseInt(value) as eslint.Linter.Severity
    )
  }

  render ({ rules }: Props, { opened, availableRules }: State) {
    if (opened) {
      return (
        <ConfigurationItem title="Rules" onClick={this.onTitleClick}>
        {Array.from(availableRules).map(([rule, { meta }]) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{rule}</div>
            <select
              value={rules[rule] || '0'}
              onChange={e => this.switchSeverity(rule, e)}
            >
              <option value="0">Disable</option>
              <option value="1">Warning</option>
              <option value="2">Error</option>
            </select>
          </div>
        ))}
        </ConfigurationItem>
      )
    } else {
      return (
        <ConfigurationItem title="Rules" onClick={this.onTitleClick} />
      )
    }
  }
}
