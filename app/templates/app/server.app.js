/* eslint no-var: 0, no-process-env: 0 */

var babelRegister = require('babel/register');

var isProduction  = process.env.NODE_ENV === 'production';

if (isProduction) {
  babelRegister();
} else {
  babelRegister({
    sourceMap: 'inline'
  });
}

var initter = require('./app/bundles/app/initters/server'),
    config  = require('./config/server.app');

require('./server')(initter, config);
