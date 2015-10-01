/* eslint "esnext": false */

'use strict';

var path = require('path');
var srcPath = path.join(__dirname, './spec');

module.exports = {
  entry: {
    javascript:  path.join(srcPath, 'spec.entry'),
    html:  path.join(srcPath, 'index.html')
  },
  output: {
    path: srcPath,
    publicPath: '/spec',
    filename: 'spec.js'
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
