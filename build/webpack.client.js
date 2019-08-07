const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const webpackCommonConfig = require('./webpack.common')

const defaultPluginConfig = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "template.html")
  }),
  new CleanWebpackPlugin()
]

const devConfig = {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true,
    historyApiFallback:{
      index: 'index.html'
    }
  },
  plugins: defaultPluginConfig.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

const prodConfig = {
  output: {
    chunkFilename: 'js/chunk.[chunkhash:8].js',
  },
  devtool: 'cheap-module-source-map',
  plugins: defaultPluginConfig.concat([

  ]),
  optimization: {
    runtimeChunk: true
  }
}

module.exports = () => {
  if (isDev) {
    return webpackMerge(webpackCommonConfig, devConfig)
  } else {
    return webpackMerge(webpackCommonConfig, prodConfig)
  }
}
