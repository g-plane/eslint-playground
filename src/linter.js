import Linter from 'eslint4b/dist/linter'
import coreRules from 'eslint/lib/load-rules'
import store from './store'
import * as emitter from './events'

/** @type {import('eslint').Linter} */
const linter = new Linter()
linter.defineRules(coreRules())
store.commit('updateRules', linter.getRules().keys())

export async function switchParser(parserName) {
  let parser

  switch (parserName) {
  case 'babel-eslint':
    parser = await import('babel-eslint')
    break
  case 'typescript-eslint-parser':
    parser = await import('typescript-eslint-parser')
    break
  case 'vue-eslint-parser':
    parser = await import('vue-eslint-parser')
    break
  default:
    break
  }

  linter.defineParser(parserName, parser)
  store.commit('changeParser', parserName)
  lint()
}

function addPrefix(prefix, rulesObj) {
  return Object.keys(rulesObj)
    .map(key => [`${prefix}/${key}`, rulesObj[key]])
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1]
      return acc
    }, Object.create(null))
}

export async function loadPlugin(pluginName) {
  let plugin
  let rules

  switch (pluginName) {
  case 'react':
    plugin = await import('eslint-plugin-react')
    rules = addPrefix('react', plugin.rules)
    break
  case 'vue':
    plugin = await import('eslint-plugin-vue')
    rules = addPrefix('vue', plugin.rules)
    break
  case 'flowtype':
    plugin = await import('eslint-plugin-flowtype')
    rules = plugin.rules
    break
  case 'typescript':
    plugin = await import('eslint-plugin-typescript')
    rules = plugin.rules
    break
  case 'promise':
    plugin = await import('eslint-plugin-promise')
    rules = addPrefix('promise', plugin.rules)
    break
  case 'unicorn':
    plugin = await import('eslint-plugin-unicorn')
    rules = plugin.rules
    break
  default:
    return
  }

  linter.defineRules(rules)
  store.commit('updateRules', linter.getRules().keys())
}

function lint() {
  const result = linter
    .verify(store.state.code, {
      parser: store.state.eslint.parser,
      parserOptions: store.state.eslint.parserOptions,
      rules: store.state.eslint.rules,
      env: store.state.eslint.envs.reduce(
        (acc, cur) => (acc[cur] = true, acc),
        Object.create(null)
      ),
      settings: store.state.eslint.settings
    })
    .map(result => ({
      startLine: result.line,
      startColumn: result.column,
      endLine: result.endLine === undefined ? result.line : result.endLine,
      endColumn:
        result.endColumn === undefined ? result.column : result.endColumn,
      severity: result.severity,
      rule: result.ruleId,
      message: result.message,
      fix: result.fix
    }))

  emitter.emit('fixable', result)

  store.commit('updateLintResult', result)

  return result
}

emitter.on('lint', lint)
store.watch(state => state.code, lint)
