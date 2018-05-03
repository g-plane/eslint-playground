import * as eslint from 'eslint'
import Linter from 'eslint/lib/linter'
import { Subject } from 'rxjs'

let parser
export const loadingProcess = new Subject()
const linter = new Linter()

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
  loadingProcess.next()
}
