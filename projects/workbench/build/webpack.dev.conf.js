'use strict'
const path = require('path');
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

function getEntry(globPath) {
  let entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) !== "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
        pathname = basename;
        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  return entries;
}

const pages = getEntry(['./src/view/*.html','./src/view/**/*.html']);

for (let pathname in pages) {
  // 配置生成的html文件，定义路径等
  let conf = {
    filename: 'workbench/' + pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true              // js插入位置
  };

  if (pathname in module.exports.entry) {
    conf.chunks = [pathname];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
