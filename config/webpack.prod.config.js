var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        except: ['$', '_', 'exports', 'require'],
      },
      sourceMap: false,
    }),
  ],
});