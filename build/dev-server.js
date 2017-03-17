// 检测当前node，npm的版本号是否符合package.json中的要求
require('./check-versions')()
// 自己写的接口分派器
var Dispatch=require('../server/dispatch')
// 基础配置，端口，基本路径...
var config = require('../config');
//如果是build模式  process.env.NODE_ENV被赋值为production
// 如果不是build模式 则给其赋值  返回development
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// 用opn打开一个网址或者文件，这里当检测到这行成功时自动打开
// 也可以设置config.dev.autoOpenBrowser来决定是否要自动打开
var opn = require('opn')
// node模块
var path = require('path')
var express = require('express')
// 自己加的用来解析post请求的参数体
var bodyParser = require('body-parser')

var webpack = require('webpack')

// http代理中间件
// app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// app.listen(3000);
// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
var proxyMiddleware = require('http-proxy-middleware')

var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// 端口号 default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// 是否自动打开网站automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var history = require('connect-history-api-fallback');

var app = express()

var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// 索引页代理请求  对使用html5的单页面程序非常有用  默认为/index.html
app.use(history({
    index: '/main.html'
  }
))

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(express.static(path.join(__dirname, '../src')));
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    console.log('success  ---------dev-server')
    opn(uri)
  }
})
//解决跨域访问问题
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, x-requested-with, X-Custom-Header, HaiYi-Access-Token, Authorization, Origin, Accept,_r_tk')
  if(req.method=="OPTIONS") res.send(200);
  else next();
});
Dispatch.server(app)
