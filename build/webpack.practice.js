const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackInlineSourcePlugin  = require('html-webpack-inline-source-plugin')
const webpackCommonConfig = require('./webpack.common')

const defaultPluginConfig = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new VueLoaderPlugin(),
  // 打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  new HtmlWebpackPlugin({
    title: 'vue 练习',
    template: path.join(__dirname, "template.html"), // 以 template.html为模板，把打包生成的js自动引入到这个html文件中
    // inlineSource: '.(js|css)$' // css 或 js 文件内嵌到 html 页面中
    inlineSource: 'runtime~.+\\.js'
  }),
  new HtmlWebpackInlineSourcePlugin()
]

// plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情
const config = {
  entry: path.resolve(__dirname, '../src/practice/index.js'),
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // sourcemap 打包编译后的文件和源文件的映射关系，用于开发者调试用
  // 解决每次在src里编写完代码都需要手动重新运行 npm run dev
  devServer: {
    port: 8080, // 开发服务器监听的端口
    host: '0.0.0.0', // 开发服务器监听的主机地址
    overlay: {
      errors: true, // 在浏览器弹出提示有错误
    },
    hot: true,
    historyApiFallback:{
      index: 'index.html'
    }
  },
  resolve: {
    alias: {
      // 为了可以在 vue 对象中直接写 template, 所以使用这个版本的 vue
      'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
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

module.exports = () => {
  return webpackMerge(webpackCommonConfig, config)
}
