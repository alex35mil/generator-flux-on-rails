/* eslint no-console: 0 */

import express              from 'express';
import bodyParser           from 'body-parser';
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devBuildConfig from './configs/build/webpack.client.dev.config.babel';
import serverConfig   from './configs/server/server.base';


let initialCompile = true;

const server   = express();
const compiler = webpack(devBuildConfig);

server.use(webpackDevMiddleware(compiler, {
  contentBase       : `http://lvh.me:${serverConfig.devPort}`,
  publicPath        : devBuildConfig.output.publicPath,
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
    children: false,
  },
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(serverConfig.devPort, 'localhost', err => {
  if (err) {
    console.log(`=> OMG!!! 🙀 ${err}`);
  }

  console.log(
    `=> 🔥  Webpack dev server is running on port ${serverConfig.devPort}`
  );
});

compiler.plugin('done', () => {
  if (initialCompile) {
    initialCompile = false;
    process.send('Done!');
  }
});
