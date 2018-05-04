const fs = require('fs')
const path = require('path')

/* eslint-disable operator-linebreak */
const rules =
  fs.readdirSync('node_modules/eslint-plugin-typescript/lib/rules')
    .filter(name => name.endsWith('.js'))
    .map(name => {
      const rule = path.basename(name, '.js')
      return `'typescript/${rule}': ` +
        `require('eslint-plugin-typescript/lib/rules/${name}')`
    })
    .join()

module.exports = `module.exports = ({rules: {${rules}}})`
