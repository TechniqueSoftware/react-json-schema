const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.join(__dirname, '../dist'),
          /node_modules/
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, '../lib'),
      path.join(__dirname, '../dist'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx']
  }
};
