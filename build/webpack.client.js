const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackInlineSourcePlugin  = require('html-webpack-inline-source-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const webpackCommonConfig = require('./webpack.common')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const defaultPluginConfig = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: devMode ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  // 打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  new HtmlWebpackPlugin({
    title: 'vue ssr 学习',
    template: path.join(__dirname, "template.html"), // 以 template.html为模板，把打包生成的js自动引入到这个html文件中
    // inlineSource: '.(js|css)$' // css 或 js 文件内嵌到 html 页面中
    inlineSource: 'runtime~.+\\.js'
  }),
  new HtmlWebpackInlineSourcePlugin(),
  new VueClientPlugin()
]

// plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情
const devConfig = {
  devtool: 'cheap-module-eval-source-map', // sourcemap 打包编译后的文件和源文件的映射关系，用于开发者调试用
  // 解决每次在src里编写完代码都需要手动重新运行 npm run dev
  devServer: {
    port: 8000, // 开发服务器监听的端口
    host: '0.0.0.0', // 开发服务器监听的主机地址
    overlay: {
      errors: true, // 在浏览器弹出提示有错误
    },
    hot: true,
    // vue-route 的 mode 模式修改为 history 后，支持刷新页面功能，否则404
    historyApiFallback:{
      // index: '/public/index.html' // 具体内容与 webpack common 中 output的 publicPath有关，若设置了 publicPath,需要加上这部分前缀
      index: '/public/index.html'
    }
  },
  plugins: defaultPluginConfig.concat([
    new webpack.HotModuleReplacementPlugin(), // 使用模块热更新插件
  ]),
  optimization: {
    usedExports: true, // tree shaking
    splitChunks: {  // 启动代码分割，有默认配置项
      chunks: 'all'
    }
  }
}

const prodConfig = {
  devtool: 'cheap-module-source-map',
  plugins: defaultPluginConfig.concat([
    new CleanWebpackPlugin(), // 在打包之前，可以删除dist文件夹下的所有内容
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css',
      chunkFilename: '[name].chunk.[chunkhash:8].css'
    })
  ]),
  optimization: {
    splitChunks: { // 启动代码分割，有默认配置项
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        exclude: /\/node_modules/,
        parallel: true,
        // sourceMap: true,
      }), // JS 压缩
      new OptimizeCSSAssetsPlugin({}) // CSS 压缩
    ],
    runtimeChunk: 'single'
  }
}

module.exports = () => {
  if (devMode) {
    return webpackMerge(webpackCommonConfig, devConfig)
  } else {
    return webpackMerge(webpackCommonConfig, prodConfig)
  }
}
