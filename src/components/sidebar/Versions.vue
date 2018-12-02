<script>
import Linter from 'eslint4b'
import babelEslint from 'babel-eslint/package.json'
import typescriptParser from 'typescript-eslint-parser/package.json'
import vueParser from 'vue-eslint-parser/package.json'
import pluginPromise from 'eslint-plugin-promise/package.json'
import pluginReact from 'eslint-plugin-react/package.json'
import pluginVue from 'eslint-plugin-vue/package.json'
import pluginUnicorn from 'eslint-plugin-unicorn/package.json'
import pluginFlowtype from 'eslint-plugin-flowtype/package.json'
import pluginTypescript from 'eslint-plugin-typescript/package.json'

import ConfigurationItem from './ConfigurationItem.vue'

export default {
  name: 'Versions',
  render() {
    return (
      <ConfigurationItem title="Version Info">
        <li>
          <a href="https://eslint.org" target="_blank" rel="noopener">
            eslint
          </a>
          v{Linter.version}
        </li>
        <li>
          <a
            href="https://github.com/babel/babel-eslint"
            target="_blank"
            rel="noopener"
          >
            babel-eslint
          </a>
          v{babelEslint.version}
        </li>
        <li>
          <a
            href="https://github.com/eslint/typescript-eslint-parser"
            target="_blank"
            rel="noopener"
          >
            typescript-eslint-parser
          </a>
          v{typescriptParser.version}
        </li>
        <li>
          <a
            href="https://github.com/mysticatea/vue-eslint-parser"
            target="_blank"
            rel="noopener"
          >
            vue-eslint-parser
          </a>
          v{vueParser.version}
        </li>
        <li>
          <a
            href="https://github.com/xjamundx/eslint-plugin-promise"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-promise
          </a>
          v{pluginPromise.version}
        </li>
        <li>
          <a
            href="https://github.com/yannickcr/eslint-plugin-react"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-react
          </a>
          v{pluginReact.version}
        </li>
        <li>
          <a
            href="https://github.com/vuejs/eslint-plugin-vue"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-vue
          </a>
          v{pluginVue.version}
        </li>
        <li>
          <a
            href="https://github.com/sindresorhus/eslint-plugin-unicorn"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-unicorn
          </a>
          v{pluginUnicorn.version}
        </li>
        <li>
          <a
            href="https://github.com/gajus/eslint-plugin-flowtype"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-flowtype
          </a>
          v{pluginFlowtype.version}
        </li>
        <li>
          <a
            href="https://github.com/bradzacher/eslint-plugin-typescript"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-typescript
          </a>
          v{pluginTypescript.version}
        </li>
      </ConfigurationItem>
    )
  }
}
</script>

<style lang="stylus" scoped>
a
  color #000
  padding-right 5px
  &:hover {
    color #000
  }
  &:focus {
    color #000
  }
</style>
