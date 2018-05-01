import { action, observable, computed, reaction, set, autorun } from 'mobx'
import * as eslint from 'eslint'
import { lint, loadParser } from './linter'

export class Store {
  @observable code = 'var a = 0'
  @observable parser = 'espree'
  @observable rules: NonNullable<eslint.Linter.Config['rules']> = {
    'no-var': 1
  }
  @observable lintingResult: eslint.Linter.LintMessage[] = []

  @computed get linterReports () {
    return this.lintingResult
      .map(message => ({
        severity: message.severity,
        ruleId: message.ruleId,
        message: message.message,
        line: message.line,
        column: message.column
      }))
  }

  @action
  changeParser (parser: string) {
    this.parser = parser
  }

  @action
  updateCode (code: string) {
    this.code = code
  }

  @action
  updateRuleSeverity (ruleId: string, severity: eslint.Linter.RuleLevel) {
    const rule = this.rules[ruleId]
    if (Array.isArray(rule)) {
      rule[0] = severity
      set(this.rules, ruleId, rule)
    } else {
      set(this.rules, ruleId, severity)
    }
  }

  @action
  updateRuleOption (rule: string, options: eslint.Linter.RuleLevelAndOptions) {
    const old = this.rules[rule]
    const severity = Array.isArray(old) ? old[0] : old
    options.unshift(severity)
    set(this.rules, rule, options)
  }

  @action
  updateLintingResult (result: eslint.Linter.LintMessage[]) {
    this.lintingResult = result
  }
}

const store = new Store()

reaction(
  () => store.parser,
  loadParser,
  {
    fireImmediately: true
  }
)

reaction(
  () => store.code,
  code => store.updateLintingResult(lint(code, store.parser, store.rules))
)

export default store
