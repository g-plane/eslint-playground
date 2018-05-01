import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { observer, inject } from 'mobx-preact'
import { Linter } from 'eslint'
import { Store } from '../../store'
import { lint, loadingProcess } from '../../linter'
import ParserSelect from './ParserSelect'
import Rules from './Rules'

const Sidebar = styled('div')`
  width: calc(25% - 1px);
  height: calc(100vh - 34px);
  border-right: 1px solid #CCC;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
`

interface Props {
  parser: string,
  changeParser (parser: string): void
}

@inject('store')
@observer
export default class extends Component<{ store: Store }, {}> {
  constructor (props) {
    super(props)
    this.onParserChange = this.onParserChange.bind(this)
    this.lint = this.lint.bind(this)
    this.updateRuleSeverity = this.updateRuleSeverity.bind(this)
    this.updateRuleOption = this.updateRuleOption.bind(this)
  }

  onParserChange (
    { currentTarget }: { currentTarget: HTMLInputElement } & Event
  ) {
    const parser = currentTarget.value
    this.props.store.changeParser(parser)
    loadingProcess.subscribe(this.lint)
  }

  lint () {
    const { code, parser, rules } = this.props.store
    this.props.store.updateLintingResult(lint(code, parser, rules))
  }

  updateRuleSeverity (ruleId: string, severity: Linter.Severity) {
    this.props.store.updateRuleSeverity(ruleId, severity)
    this.lint()
  }

  updateRuleOption (ruleId: string, options: Linter.RuleLevelAndOptions) {
    this.props.store.updateRuleOption(ruleId, options)
    this.lint()
  }

  render ({ store }: { store: Store }) {
    return (
      <Sidebar>
        <ParserSelect
          currentParser={store.parser}
          onChange={this.onParserChange}
        />
        <Rules
          rules={store.rules}
          onSeverityChange={this.updateRuleSeverity}
          onOptionsChange={this.updateRuleOption}
        />
      </Sidebar>
    )
  }
}
