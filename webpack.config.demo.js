module.exports = {
  entry: {
    javascript: './demo/index.jsx',
    html: './demo/index.html'
  },
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  externals: {
    'React': 'react',
    'ReactBootstrap': 'react-bootstrap'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
