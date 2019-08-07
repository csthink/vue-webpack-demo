const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const createVueLoaderOptions = require('./vue-loader.config')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.resolve(__dirname, '../client/index.js'),
  output: {
    filename: 'js/bundle.[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
      }
    ]
  }
}
