const _ = require('lodash');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const packageJSON = require('../package.json');

module.exports = _.merge({}, require('./webpack.dev'), {
  mode: 'production',
  output: {
    filename: 'formio.min.js'
  },
  optimization: {
    // Minify in-process: passing the multi-MB bundles to jest-worker threads
    // exhausts the heap when several builds run in parallel.
    minimizer: [new TerserPlugin({ parallel: false })]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.BannerPlugin(
      `formiojs v${packageJSON.version} | https://unpkg.com/formiojs@${packageJSON.version}/LICENSE.txt`
    )
  ]
});
