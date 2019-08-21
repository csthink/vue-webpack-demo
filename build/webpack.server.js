const path = require('path')
const webpackMerge = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpackCommonConfig = require('./webpack.common')

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
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: '[path][name]__[local]',
                  },
                  importLoaders: 2, //如果sass文件里还引入了另外一个sass文件，另一个文件还会从sass-loader向上解析。如果不加，就直接从css-loader开始解析
                  sourceMap: true,
                  localsConvention: 'camelCase'
                },
              },
              'postcss-loader', // 配置在 css-loader后，在sass|less|stylus-loader 之前
              'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css',
      chunkFilename: '[name].chunk.[chunkhash:8].css'
    }),
    new VueServerPlugin()
  ]
}

module.exports = () => {
  return webpackMerge(webpackCommonConfig, config)
}
