const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const reactJsonSchema = path.join(__dirname, './lib/ReactJsonSchema.js');
const distPath = path.join(__dirname, './dist');

module.exports = {
  entry: {
    'react-json-schema': reactJsonSchema,
    'react-json-schema.min': reactJsonSchema,
  },
  output: {
    library: 'ReactJsonSchema',
    libraryTarget: 'umd',
    path: distPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /lib/,
        exclude: /node_modules/,
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
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  resolve: {
    modules: [
      path.join(__dirname, 'lib'),
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(distPath),
    new UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ]
};
