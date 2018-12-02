const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: path.resolve('node_modules', 'eslint', 'lib', 'load-rules.js'),
          loader: 'string-replace-loader',
          options: {
            search: '[\\s\\S]+',
            replace: require('./build/eslint-rules/core'),
            flags: 'g'
          }
        },
        {
          test: path.resolve(
            'node_modules',
            'eslint-plugin-flowtype',
            'dist',
            'index.js'
          ),
          loader: 'string-replace-loader',
          options: {
            search: '[\\s\\S]+',
            replace: require('./build/eslint-rules/flowtype'),
            flags: 'g'
          }
        },
        {
          test: path.resolve(
            'node_modules',
            'eslint-plugin-typescript',
            'lib',
            'index.js'
          ),
          loader: 'string-replace-loader',
          options: {
            search: '[\\s\\S]+',
            replace: require('./build/eslint-rules/typescript'),
            flags: 'g'
          }
        },
        {
          test: path.resolve(
            'node_modules',
            'eslint-plugin-unicorn',
            'index.js'
          ),
          loader: 'string-replace-loader',
          options: {
            search: '[\\s\\S]+',
            replace: require('./build/eslint-rules/unicorn'),
            flags: 'g'
          }
        },
        {
          test: /node_modules[/\\]eslint-utils[/\\]index\.m?js$/,
          use: [
            {
              loader: 'string-replace-loader',
              options: {
                search: '\\bin global\\b',
                replace: 'in window',
                flags: 'g'
              }
            },
            {
              loader: 'string-replace-loader',
              options: {
                search: '\\bglobal\\[',
                replace: 'window[',
                flags: 'g'
              }
            }
          ]
        },
        {
          test: /vue-eslint-parser/,
          loader: 'string-replace-loader',
          options: {
            search:
              'typeof parserOptions.parser === "string"\n        ? require(parserOptions.parser)\n        : require("espree")',
            replace:
              '(parserOptions.parser === "babel-eslint"' +
              '? require("babel-eslint") : (' +
              'parserOptions.parser === "typescript-eslint-parser" ?' +
              'require("typescript-eslint-parser") : require("espree")))'
          }
        },
        {
          test: /node_modules[/\\]babel-eslint[/\\]lib[/\\]analyze-scope\.js$/,
          use: [
            {
              loader: 'string-replace-loader',
              options: {
                search: 'require("./patch-eslint-scope")',
                replace: 'Object'
              }
            }
          ]
        },
        {
          test: /node_modules[/\\]typescript[/\\]lib[/\\]typescript.js$/,
          use: [
            {
              loader: 'string-replace-loader',
              options: {
                search: 'require\\(.+?\\)',
                replace: 'null',
                flags: 'g'
              }
            }
          ]
        }
      ]
    },
    plugins: [new MonacoWebpackPlugin()],
    node: {
      child_process: 'empty', // eslint-disable-line camelcase
      fs: 'empty',
      module: 'empty'
    }
  }
}
