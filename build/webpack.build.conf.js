var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var env = config.build.env;
var entries = config.build.entries;
var chunks = Object.keys(entries);

var webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: getPlugins()
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

function getPlugins () {
  var plugins = [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: env.NODE_ENV
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: chunks,
      minChunks: chunks.length // 提取所有entry共同依赖的模块
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  ]

  //根据配置进行判断
  if(env.isUglyfy){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }))
  };

  //暴露接口变量
  plugins.push(new webpack.ProvidePlugin({
    ENV_OPT: config.build.envopt,
    $: 'jquery'
  }));

  return plugins;
}

var pages = Object.keys(config.build.pageEntries);
pages.forEach(function(pathname) {
  var conf = {
    filename: path.resolve(__dirname, '../public/tpl/' + pathname + '.html'), //生成的html存放路径，相对于path
    template: config.build.viewRoot + pathname + '.html', //html模板路径
    inject: false, //js插入的位置，true/'head'/'body'/false
  };
  if (pathname in webpackConfig.entry) {
    conf.inject = 'body';
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig
