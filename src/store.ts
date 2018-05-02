import {
  action,
  observable,
  computed,
  reaction,
  set,
  autorun,
} from 'mobx'
import { Linter } from 'eslint'
import { lint, loadParser } from './linter'

export class Store {
  @observable code = 'var a = 0'
  @observable parser = 'espree'
  @observable parserOptions: Linter.ParserOptions = {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
  @observable rules: NonNullable<Linter.Config['rules']> = {}
  @observable lintingResult: Linter.LintMessage[] = []

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

  @action.bound
  updateParserOptions (options: Linter.ParserOptions) {
    this.parserOptions = { ...this.parserOptions, ...options }
  }

  @action
  updateRuleSeverity (ruleId: string, severity: Linter.RuleLevel) {
    const rule = this.rules[ruleId]
    if (Array.isArray(rule)) {
      rule[0] = severity
      set(this.rules, ruleId, rule)
    } else {
      set(this.rules, ruleId, severity)
    }
  }

  @action
  updateRuleOption (rule: string, options: Linter.RuleLevelAndOptions) {
    const old = this.rules[rule]
    const severity = Array.isArray(old) ? old[0] : old
    options.unshift(severity)
    set(this.rules, rule, options)
  }

  @action.bound
  replaceRules (rules: Linter.Config['rules'] = {}) {
    this.rules = rules
  }

  @action
  updateLintingResult (result: Linter.LintMessage[]) {
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

reaction(
  () => store.rules,
  rules => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules
  }))
)

reaction(
  () => store.parserOptions,
  parserOptions => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions,
    rules: store.rules
  }))
)

export default store
