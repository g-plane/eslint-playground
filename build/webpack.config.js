const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
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
          replace: require('./eslint-rules'),
          flags: 'g'
        }
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
