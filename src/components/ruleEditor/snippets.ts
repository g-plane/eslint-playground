export const defaultRuleInJS = `
/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  create(context) {
    return {
      //
    }
  }
}

export default rule
`.trimStart()

export const defaultRuleInTS = `
import type { Rule } from 'eslint'

const rule: Rule.RuleModule = {
  create(context) {
    return {
      //
    }
  }
}

export default rule
`.trimStart()
