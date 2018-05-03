import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { ConfigurationItem } from './ConfigurationItem'
import eslint from 'eslint/package.json'
import babelEslint from 'babel-eslint/package.json'
import typescriptParser from 'typescript-eslint-parser/package.json'
import vueParser from 'vue-eslint-parser/package.json'
import pluginPromise from 'eslint-plugin-promise/package.json'
import pluginReact from 'eslint-plugin-react/package.json'
import pluginUnicorn from 'eslint-plugin-unicorn/package.json'
import pluginFlowtype from 'eslint-plugin-flowtype/package.json'

const Link = styled('a')`
  color: #000;
  padding-right: 5px;
  &:hover {
    color: #000;
  }
  &:focus {
    color: #000;
  }
`

interface State {
  opened: boolean
}

export default class extends Component<{}, State> {
  state = {
    opened: false
  }

  constructor (props) {
    super(props)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onTitleClick () {
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  render ({}, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem
          title="Version Info"
          onClick={this.onTitleClick}
        >
          <div>
            <Link href="https://eslint.org" target="_blank" rel="noopener">
              eslint
            </Link>
            v{eslint.version}
          </div>
          <div>
            <Link
              href="https://github.com/babel/babel-eslint"
              target="_blank"
              rel="noopener"
            >
              babel-eslint
            </Link>
            v{babelEslint.version}
          </div>
          <div>
            <Link
              href="https://github.com/eslint/typescript-eslint-parser"
              target="_blank"
              rel="noopener"
            >
              typescript-eslint-parser
            </Link>
            v{typescriptParser.version}
          </div>
          <div>
            <Link
              href="https://github.com/mysticatea/vue-eslint-parser"
              target="_blank"
              rel="noopener"
            >
              vue-eslint-parser
            </Link>
            v{vueParser.version}
          </div>
          <div>
            <Link
              href="https://github.com/xjamundx/eslint-plugin-promise"
              target="_blank"
              rel="noopener"
            >
              eslint-plugin-promise
            </Link>
            v{pluginPromise.version}
          </div>
          <div>
            <Link
              href="https://github.com/yannickcr/eslint-plugin-react"
              target="_blank"
              rel="noopener"
            >
              eslint-plugin-react
            </Link>
            v{pluginReact.version}
          </div>
          <div>
            <Link
              href="https://github.com/sindresorhus/eslint-plugin-unicorn"
              target="_blank"
              rel="noopener"
            >
              eslint-plugin-unicorn
            </Link>
            v{pluginUnicorn.version}
          </div>
          <div>
            <Link
              href="https://github.com/gajus/eslint-plugin-flowtype"
              target="_blank"
              rel="noopener"
            >
              eslint-plugin-flowtype
            </Link>
            v{pluginFlowtype.version}
          </div>
        </ConfigurationItem>
      )
    } else {
      return <ConfigurationItem
        title="Version Info"
        onClick={this.onTitleClick}
      />
    }
  }
}
