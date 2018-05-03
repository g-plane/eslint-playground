import {
  action,
  observable,
  computed,
  reaction,
  set,
  ObservableMap,
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
  @observable envsList = new Map([
    ['browser', true],
    ['es6', true]
  ]) as ObservableMap<string, boolean>
  @observable lintingResult: Linter.LintMessage[] = []
  @observable reactPragma = 'React'
  @observable onlyFilesWithFlowAnnotation = true

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

  @computed get envs () {
    return this.envsList.toJSON()
  }

  @computed get sharedSettings () {
    return {
      react: {
        pragma: this.reactPragma
      },
      flowtype: {
        onlyFilesWithFlowAnnotation: this.onlyFilesWithFlowAnnotation
      }
    }
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

  @action.bound
  replaceRules (rules: Linter.Config['rules'] = {}) {
    this.rules = rules
  }

  @action.bound
  toggleEnv (name: string) {
    this.envsList.set(name, !this.envsList.get(name))
  }

  @action
  updateLintingResult (result: Linter.LintMessage[]) {
    this.lintingResult = result
  }

  @action.bound
  changeReactPragma (pragma: string) {
    this.reactPragma = pragma
  }

  @action.bound
  toggleOnlyFilesWithFlowAnnotation () {
    this.onlyFilesWithFlowAnnotation = !this.onlyFilesWithFlowAnnotation
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
  code => store.updateLintingResult(lint({
    code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules: store.rules,
    env: store.envs,
    settings: store.sharedSettings
  }))
)

reaction(
  () => store.rules,
  rules => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules,
    env: store.envs,
    settings: store.sharedSettings
  }))
)

reaction(
  () => store.parserOptions,
  parserOptions => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions,
    rules: store.rules,
    env: store.envs,
    settings: store.sharedSettings
  }))
)

reaction(
  () => store.envs,
  envs => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules: store.rules,
    env: envs,
    settings: store.sharedSettings
  }))
)

reaction(
  () => store.reactPragma,
  () => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules: store.rules,
    env: store.envs,
    settings: store.sharedSettings
  }))
)

reaction(
  () => store.onlyFilesWithFlowAnnotation,
  () => store.updateLintingResult(lint({
    code: store.code,
    parserName: store.parser,
    parserOptions: store.parserOptions,
    rules: store.rules,
    env: store.envs,
    settings: store.sharedSettings
  }))
)

export default store
