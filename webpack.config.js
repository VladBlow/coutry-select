const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
        fallback: {loader: 'style-loader'},
        use: [
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
            }
          }
        ]
      })
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.styl']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
