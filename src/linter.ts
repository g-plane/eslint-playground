import { Linter } from 'eslint'
import { Subject } from 'rxjs'
import store from './store'

let parser
export const loadingProcess = new Subject()
const linter = new Linter()

export function getRules () {
  return linter.getRules()
}

export function lint (
  code,
  parserName,
  rules: Linter.Config['rules']
) {
  return linter.verify(code, { parser: parserName, rules })
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
  default:
    return {}
  }
  linter.defineParser(parserName, parser)
  loadingProcess.next()
}
