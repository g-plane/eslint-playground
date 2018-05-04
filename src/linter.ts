import * as eslint from 'eslint'
import Linter from 'eslint/lib/linter'
import { Subject } from 'rxjs'

let parser
export const loadingProcess = new Subject()
const linter = new Linter()

function addPrefix (prefix: string, rulesObj: any) {
  return Object
    .keys(rulesObj)
    .map(key => [`${prefix}/${key}`, rulesObj[key]])
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1]
      return acc
    }, {})
}

export async function loadPlugin (pluginName: string) {
  let plugin: any
  let rules: any
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
  loadingProcess.next('plugin-loaded')
}

export function getRules () {
  return linter.getRules()
}

export function lint ({
  code,
  parserName,
  rules,
  parserOptions,
  env,
  settings
}: {
  code: string,
  parserName: string,
  rules: eslint.Linter.Config['rules'],
  parserOptions: eslint.Linter.ParserOptions,
  env: { [name: string]: boolean },
  settings: any
}) {
  return linter.verify(code, {
    parser: parserName,
    parserOptions,
    rules,
    env,
    settings
  })
}

export async function loadParser (parserName: string) {
  switch (parserName) {
  case 'espree':
    parser = await import('espree')
    break
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
    return {}
  }
  linter.defineParser(parserName, parser)
  loadingProcess.next('parser-loaded')
}
