import { h, Component } from 'preact'
import { css } from 'preact-emotion'
import { observer } from 'mobx-preact'
import { ConfigurationItem } from './ConfigurationItem'
import * as eslint from 'eslint'
import { getRules } from '../../linter'

const availableRules = getRules()

function renderRule (
  rule: string,
  meta: eslint.Rule.RuleMetaData,
  onUpdate: (options: eslint.Linter.RuleLevelAndOptions) => void
) {
  if (Array.isArray(meta)) {
    return meta.map(scm => {
      if ('enum' in scm) {
        return (
          <div>
            {scm.enus.map(v => (
              <label>
                <input name={`${rule}-enum`} value={v} type="radio" />
                {v}
              </label>
            ))}
          </div>
        )
      }
    })
  } else if (meta !== undefined) {
    //
  } else {
    return null
  }
}

const serverityStyle = css`
  padding-left: 2px;
  padding-right: 4px;
`

interface Props {
  rules: NonNullable<eslint.Linter.Config['rules']>
  onSeverityChange (ruleId: string, severity: eslint.Linter.Severity): void
  onOptionsChange (
    ruleId: string,
    options: eslint.Linter.RuleLevelAndOptions
  ): void
}

interface State {
  opened: boolean
}

@observer
export default class extends Component<Props, State> {
  state = {
    opened: true
  }

  changeSeverity: Map<string, (event: Event) => void> = Array
    .from(availableRules)
    .map(([rule]) => [rule, ({ currentTarget }: Event) => {
      const severity = (currentTarget as HTMLInputElement).value
      this.props.onSeverityChange(
        rule,
        Number.parseInt(severity) as eslint.Linter.Severity
      )
    }])
    .reduce((
      acc: Map<string, (event: Event) => void>,
      [rule, fn]
    ) => acc.set(rule as string, fn as () => void), new Map())

  changeRuleOptions (rule: string) {
    return options => this.props.onOptionsChange(rule, options)
  }

  constructor (props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  render ({ rules }: Props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem title="Rules" onClick={this.onTitleClick}>
        {Array.from(availableRules).map(([rule, { meta }]) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{rule}</div>
            <div>
              <label class={serverityStyle}>
                <input
                  type="radio"
                  name={rule}
                  value="0"
                  checked={!rules[rule]}
                  onChange={this.changeSeverity.get(rule)}
                />
                Disable
              </label>
              <label class={serverityStyle}>
                <input
                  type="radio"
                  name={rule}
                  value="1"
                  checked={rules[rule] === 1 || rules[rule] === 'warning'}
                  onChange={this.changeSeverity.get(rule)}
                />
                Warning
              </label>
              <label class={serverityStyle}>
                <input
                  type="radio"
                  name={rule}
                  value="2"
                  checked={rules[rule] === 2 || rules[rule] === 'error'}
                  onChange={this.changeSeverity.get(rule)}
                />
                Error
              </label>
            </div>
            {renderRule(rule, meta!, this.changeRuleOptions(rule))}
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
