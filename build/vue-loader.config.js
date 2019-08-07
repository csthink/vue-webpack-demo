module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // VUE 去掉元素之间的空格
    // extractCss: !isDev, // 使用 extract-text-webpack-plugin 自动提取 CSS,不具备css热重载，应在生产环境中使用
    // cssModules 由于 vue-loader 15 升级的原因，需要在 webpack 中全局配置 css
    // cssModules: {},
    // 自定义模块
    // loaders: {
    //   'docs': docsLoader
    // },
    // hotReload: false, // 根据环境变量生成
    // preLoader: {},
    // postLoader: {}
  }
}
