module.exports = {
  entry: ('./spec/spec.entry'),
  output: {
    path: './spec',
    filename: 'spec.js',
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
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
