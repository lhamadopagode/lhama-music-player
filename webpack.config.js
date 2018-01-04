const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  devtool: 'source-map'
}
