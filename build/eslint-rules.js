const fs = require('fs')
const path = require('path')

function isJs (name) {
  return name.endsWith('.js')
}

/* eslint-disable operator-linebreak */
const core =
  fs.readdirSync('node_modules/eslint/lib/rules')
    .filter(isJs)
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'${rule}': require('eslint/lib/rules/${name}')`
    })
    .join()

const promise =
  fs.readdirSync('node_modules/eslint-plugin-promise/rules')
    .filter(isJs)
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'promise/${rule}': require('eslint-plugin-promise/rules/${name}')`
    })
    .join()

const react =
  fs.readdirSync('node_modules/eslint-plugin-react/lib/rules')
    .filter(isJs)
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'react/${rule}': require('eslint-plugin-react/lib/rules/${name}')`
    })
    .join()

const unicorn =
  fs.readdirSync('node_modules/eslint-plugin-unicorn/rules')
    .filter(isJs)
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'unicorn/${rule}': require('eslint-plugin-unicorn/rules/${name}')`
    })
    .join()

const flowtype =
  fs.readdirSync('node_modules/eslint-plugin-flowtype/dist/rules')
    .filter(isJs)
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'flowtype/${rule}': ` +
        `require('eslint-plugin-flowtype/dist/rules/${name}')`
    })
    .join()

const rules = [
  core,
  promise,
  react,
  unicorn,
  flowtype
]

module.exports = `module.exports = () => ({${rules.join()}})`
