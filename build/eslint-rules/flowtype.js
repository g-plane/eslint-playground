const fs = require('fs')
const path = require('path')
const lodash = require('lodash')

/* eslint-disable operator-linebreak */
const rules =
  fs.readdirSync('node_modules/eslint-plugin-flowtype/dist/rules')
    .filter(name => name.endsWith('.js'))
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'flowtype/${lodash.kebabCase(rule)}': ` +
        `require('eslint-plugin-flowtype/dist/rules/${name}')`
    })
    .join()

module.exports = `module.exports = ({rules: {${rules}}})`
