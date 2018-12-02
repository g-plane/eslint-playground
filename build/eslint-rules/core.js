const fs = require('fs')
const path = require('path')

/* eslint-disable operator-linebreak */
const rules = fs
  .readdirSync('node_modules/eslint/lib/rules')
  .filter(name => name.endsWith('.js'))
  .map(name => {
    const rule = path.basename(name, '.js')
    return `'${rule}': require('eslint/lib/rules/${name}')`
  })
  .join()

module.exports = `module.exports = () => ({${rules}})`
