/* eslint no-var: 0, no-console: 0 */

require('babel/register')();

var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./build/webpack.config.dev');
var serverConfig     = require('./config/server');


var initialCompile = true;

var compiler = webpack(webpackConfig);

var devServer = new WebpackDevServer(compiler, {
  contentBase       : 'http://lvh.me:' + serverConfig.devPort,
  publicPath        : webpackConfig.output.publicPath,
  hot               : true,
  inline            : true,
  historyApiFallback: true,
  quiet             : false,
  noInfo            : false,
  lazy              : false,
  stats             : {
    colors  : true,
    hash    : false,
    version : false,
    chunks  : false,
    children: false
  }
});

devServer.listen(serverConfig.devPort, 'localhost', function(err) {
  if (err) console.error(err);
  console.log('=> 🔥  Webpack development server is running on port %s', serverConfig.devPort);
});

compiler.plugin('done', function() {
  if (initialCompile) {
    initialCompile = false;
    process.stdout.write('Webpack: Done!');
  }
});
