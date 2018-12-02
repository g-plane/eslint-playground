const fs = require('fs')
const path = require('path')

/* eslint-disable operator-linebreak */
const rules = fs
  .readdirSync('node_modules/eslint-plugin-unicorn/rules')
  .filter(name => name.endsWith('.js'))
  .map(name => {
    const rule = path.basename(name, '.js')
    return (
      `'unicorn/${rule}': require('eslint-plugin-unicorn/rules/${name}')`
    )
  })
  .join()

module.exports = `module.exports = ({rules: {${rules}}})`
