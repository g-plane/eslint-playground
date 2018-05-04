const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

/* eslint-disable operator-linebreak */
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: path.resolve('node_modules', 'eslint', 'lib', 'load-rules.js'),
        loader: 'string-replace-loader',
        options: {
          search: '[\\s\\S]+',
          replace: require('./eslint-rules/core'),
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
          replace: require('./eslint-rules/flowtype'),
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
          replace: require('./eslint-rules/typescript'),
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
          replace: require('./eslint-rules/unicorn'),
          flags: 'g'
        }
      },
      {
        test: new RegExp(
          `eslint\\${path.sep}lib\\${path.sep}(?:linter|rules)\\.js$`
        ),
        loader: 'string-replace-loader',
        options: {
          search: '(?:\\|\\||(\\())\\s*require\\(.+?\\)',
          replace: '$1',
          flags: 'g',
        },
      },
      {
        test: /vue-eslint-parser/,
        loader: 'string-replace-loader',
        options: {
          search: 'require(parserOptions.parser || "espree")',
          replace: '(parserOptions.parser === "babel-eslint"' +
            '? require("babel-eslint") : (' +
            'parserOptions.parser === "typescript-eslint-parser" ?' +
            'require("typescript-eslint-parser") : require("espree")))',
        },
      },
    ]
  },
  plugins: [
    new MonacoWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  node: {
    child_process: 'empty',  // eslint-disable-line camelcase
    fs: 'empty',
    module: 'empty',
  },
}
