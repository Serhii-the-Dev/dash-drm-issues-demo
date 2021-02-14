const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = 4200

module.exports = () => {
  return {
    entry: './app/index.js',
    resolve: {
      mainFields: ['main', 'module', 'browser'],
      alias: {
        '@': path.resolve(__dirname, 'app/')
      },
      fallback: {
        // NOTE: required by dash.js, since Webpack 5 doesn't provide Node fallbacks
        buffer: require.resolve('safe-buffer'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/')
      }
    },
    output: {
      filename: '[name].[contenthash].js',
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ],
    devServer: {
      host: '0.0.0.0',
      openPage: `http://localhost:${port}`,
      port,
      hot: true,
      overlay: true
    },
    devtool: 'source-map'
  }
}
