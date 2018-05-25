import webpack from "webpack";
import path from "path";
import Stylish from 'webpack-stylish';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './js/app.js',
    head: './js/head.js'
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /(node_modules)/,
        query: {cacheDirectory: true}
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new Stylish()
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'site/static'),
    publicPath: '/'
  },
  externals:  [/^vendor\/.+\.js$/]
};
