// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path'),
    entryName = 'index';  //配置入口文件名称
var glob = require('glob')


//获取环境参数
var options = process.argv[2];
if (options && !isNaN(options) && options >= 10000 && options < 65535) {
    //数字端口号
    var port = options;
}
if (options == 'dev' || options == 'test' || options == 'prod') {
} else {
    options = 'dev';
}
var envopt = path.resolve(__dirname, './' + options + '.env');


module.exports = {
  build: {
    viewRoot: 'src/views/', //模板根路径
    // entries: getEntry(path.resolve(__dirname, '../src/js/pages/**/*.js'), path.resolve(__dirname, '../src/js/pages/')), //多页面入口路径
    entries: getEntry('src/js/pages/**/*.js', 'src/js/pages/'), //多页面入口路径
    pageEntries: getEntry('src/views/**/*.html', 'src/views/'), //多页面模板路径
    env: require(envopt),
    envopt: envopt,
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'assets_default',
    // assetsPublicPath: path.resolve(__dirname, '../public/') + '/',
    assetsPublicPath: path.resolve(__dirname, '../public/') + '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.normalize(path.join(dirname,  basename));
    pathDir = path.normalize(pathDir);
    if(pathname.startsWith(pathDir)){
      pathname = pathname.substring(pathDir.length)
    }
    entries[pathname] = ['./' + entry];
  }
  return entries;
}
