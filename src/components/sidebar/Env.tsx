import { h, Component } from 'preact'
import { css } from 'preact-emotion'
import { observer } from 'mobx-preact'
import { Linter } from 'eslint'
import { ConfigurationItem } from './ConfigurationItem'

const availableEnvs = [
  'browser',
  'node',
  'commonjs',
  'shared-node-browser',
  'es6',
  'worker',
  'amd',
  'mocha',
  'jasmine',
  'jest',
  'phantomjs',
  'protractor',
  'qunit',
  'jquery',
  'prototypejs',
  'shelljs',
  'meteor',
  'mongo',
  'applescript',
  'nashorn',
  'serviceworker',
  'atomtest',
  'embertest',
  'webextensions',
  'greasemonkey',
]

interface Props {
  envs: { [name: string]: boolean }
  toggleEnv (env: string): void
}

interface State {
  opened: boolean
}

@observer
export default class extends Component<Props, State> {
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

  render ({ envs, toggleEnv }: Props, { opened }: State) {
    if (opened) {
      return (
        <ConfigurationItem
          title="Environments"
          onClick={this.onTitleClick}
        >
          {availableEnvs.map(env => (
            <label>
              <input
                type="checkbox"
                checked={envs[env]}
                onChange={() => toggleEnv(env)}
              />
              {env}
            </label>
          ))}
        </ConfigurationItem>
      )
    } else {
      return <ConfigurationItem
        title="Environments"
        onClick={this.onTitleClick}
      />
    }
  }
}
