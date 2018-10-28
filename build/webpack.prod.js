const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.config')

module.exports = merge(base, {
  mode: 'none',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './index.ejs'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: false,
        extractComments: {
          filename: 'LICENSES'
        },
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/
          }
        },
        exclude: [/sweetalert2$/, /node_modules.*jquery$/]
      })
    ]
  }
})
