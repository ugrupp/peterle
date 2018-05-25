const merge = require('webpack-merge');
const common = require('./webpack.conf.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist'
  }
});
