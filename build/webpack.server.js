const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ServerMiniCssExtractPlugin = require('./ServerMiniCssExtractPlugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpackCommonConfig = require('./webpack.common')
// const devMode = process.env.NODE_ENV !== 'production'

const config = {
  entry: path.resolve(__dirname, '../src/client/server-entry.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.resolve(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'style.[contenthash:8].css'
    // }),
    new VueServerPlugin()
  ]
}

module.exports = webpackMerge(webpackCommonConfig, config)
