var path = require('path')
var config = require('../config/index')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}



