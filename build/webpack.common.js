const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'
const createVueLoaderOptions = require('./vue-loader.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/client/index.js')
  },
  target: 'web',
  output: {
    filename: '[name].bundle.[hash:8].js', // palceholder占位符,入口文件打包后生成的文件名
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' // 将注入到 html中的 js文件前面加上地址
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(devMode),
      },
      {
        // Vue Loader 自定义块
        resourceQuery: /blockType=docs/,
        loader: require.resolve('./docs-loader.js')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              // loader的执行顺序是从右向左，从下到上
              devMode ? 'vue-style-loader': MiniCssExtractPlugin.loader, // 将 JS 字符串生成为 style 节点
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
              devMode ? 'vue-style-loader': MiniCssExtractPlugin.loader,
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'resources/[path][name].[hash:8].[ext]',
            // outputPath: 'assets/images/',
            limit: 1024, // 图片小于limit(单位byte, 1KB)的时候会把图片BASE64编码,大于就会打包成文件格式
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'resources/[path]/[name].[hash:8].[ext]',
          },
        }],
      }
    ]
  }
}
