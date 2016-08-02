var path = require('path');
var srcPath = path.join(__dirname, './spec');

module.exports = {
  entry: {
    javascript: path.join(srcPath, 'spec.entry'),
    html: path.join(srcPath, 'index.html')
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
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
        }
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
