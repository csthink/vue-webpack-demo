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

const defaultPluginConfig = [
  // 创建一些在编译时可以配置的全局常量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: devMode ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  // 打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "template.html"), // 以 template.html为模板，把打包生成的js自动引入到这个html文件中
    // inlineSource: '.(js|css)$' // css 或 js 文件内嵌到 html 页面中
    inlineSource: 'runtime~.+\\.js'
  }),
  new HtmlWebpackInlineSourcePlugin()
]

// plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情
const devConfig = {
  entry: {
    app: path.resolve(__dirname, '../client/index.js')
  },
  devtool: 'cheap-module-eval-source-map', // sourcemap 打包编译后的文件和源文件的映射关系，用于开发者调试用
  // 解决每次在src里编写完代码都需要手动重新运行 npm run dev
  devServer: {
    port: 8000, // 开发服务器监听的端口
    host: '0.0.0.0', // 开发服务器监听的主机地址
    overlay: {
      errors: true, // 在浏览器弹出提示有错误
    },
    hot: true,
    historyApiFallback:{
      index: 'index.html'
    }
  },
  plugins: defaultPluginConfig.concat([
    new webpack.HotModuleReplacementPlugin(), // 使用模块热更新插件
  ]),
  optimization: {
    splitChunks: {  // 启动代码分割，有默认配置项
      chunks: 'all'
    }
  }
}

const prodConfig = {
  entry: {
    app: path.resolve(__dirname, '../client/index.js')
  },
  output: {
    filename: 'js/[name][hash:8].js', // palceholder占位符,入口文件打包后生成的文件名
    chunkFilename: 'js/vendor.[chunkhash:8].js', // 配置打包后这些第三方库的名字
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' // 将注入到 html中的 js文件前面加上地址
  },
  devtool: 'cheap-module-source-map',
  plugins: defaultPluginConfig.concat([
    new CleanWebpackPlugin(), // 在打包之前，可以删除dist文件夹下的所有内容
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:8].css',
      chunkFilename: 'css/[name].chunk.[chunkhash:8].css'
    })
  ]),
  optimization: {
    splitChunks: { // 启动代码分割，有默认配置项
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin(), // JS 压缩
      new OptimizeCSSAssetsPlugin({}) // CSS 压缩
    ],
    runtimeChunk: {
      name: 'runtime'
		}
  }
}

module.exports = () => {
  if (devMode) {
    return webpackMerge(webpackCommonConfig, devConfig)
  } else {
    return webpackMerge(webpackCommonConfig, prodConfig)
  }
}
