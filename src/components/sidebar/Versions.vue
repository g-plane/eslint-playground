<script>
import pkg from '../../../package.json'
import ConfigurationItem from './ConfigurationItem.vue'

const deps = pkg.dependencies

export default {
  name: 'Versions',
  methods: {
    getVersion(name) {
      return deps[name].slice(1)
    }
  },
  render() {
    return (
      <ConfigurationItem title="Version Info">
        <li>
          <a href="https://github.com/g-plane/eslint-playground" target="_blank" rel="noopener">
            eslint-playground
          </a>
          v{pkg.version}
        </li>
        <li>
          <a href="https://eslint.org" target="_blank" rel="noopener">
            eslint
          </a>
          v{this.getVersion('eslint4b')}
        </li>
        <li>
          <a
            href="https://github.com/babel/babel-eslint"
            target="_blank"
            rel="noopener"
          >
            babel-eslint
          </a>
          v{this.getVersion('babel-eslint')}
        </li>
        <li>
          <a
            href="https://github.com/eslint/typescript-eslint-parser"
            target="_blank"
            rel="noopener"
          >
            typescript-eslint-parser
          </a>
          v{this.getVersion('typescript-eslint-parser')}
        </li>
        <li>
          <a
            href="https://github.com/mysticatea/vue-eslint-parser"
            target="_blank"
            rel="noopener"
          >
            vue-eslint-parser
          </a>
          v{this.getVersion('vue-eslint-parser')}
        </li>
        <li>
          <a
            href="https://github.com/xjamundx/eslint-plugin-promise"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-promise
          </a>
          v{this.getVersion('eslint-plugin-promise')}
        </li>
        <li>
          <a
            href="https://github.com/yannickcr/eslint-plugin-react"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-react
          </a>
          v{this.getVersion('eslint-plugin-react')}
        </li>
        <li>
          <a
            href="https://github.com/vuejs/eslint-plugin-vue"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-vue
          </a>
          v{this.getVersion('eslint-plugin-vue')}
        </li>
        <li>
          <a
            href="https://github.com/sindresorhus/eslint-plugin-unicorn"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-unicorn
          </a>
          v{this.getVersion('eslint-plugin-unicorn')}
        </li>
        <li>
          <a
            href="https://github.com/gajus/eslint-plugin-flowtype"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-flowtype
          </a>
          v{this.getVersion('eslint-plugin-flowtype')}
        </li>
        <li>
          <a
            href="https://github.com/bradzacher/eslint-plugin-typescript"
            target="_blank"
            rel="noopener"
          >
            eslint-plugin-typescript
          </a>
          v{this.getVersion('eslint-plugin-typescript')}
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
