var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = (dir = '') => path.join(__dirname, '..', dir);
const nodeModulesPath = resolve('node_modules');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: './dist',
    filename: 'index.js',
  },  
  // 帮助 webpack 快速定位 modules
  resolve: {
    modules: [nodeModulesPath],
  },
  module: {
    noParse: [
      path.join(nodeModulesPath, 'jquery/dist/jquery.min'),
      path.join(nodeModulesPath, 'lodash/lodash.min'),
    ],
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'stage-0'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        include: /src/,
        exclude: /(node_modules|config)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            eslint: {
              configFile: resolve('.eslintrc.js'),
            },
            failOnWarning: false,
            failOnError: false,
            fix: false,
            quiet: true,
            emitWarning: true,
            formatter: require('eslint-friendly-formatter'),
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'promise-polyfill',
    }),
    new CleanWebpackPlugin(
        ['dist'], {
          root: resolve(),
          verbose: true,
          dry: false,
        }),
  ],
};