/* eslint no-var: 0 */

require('babel/register')();

var initter = require('./app/bundles/app/initters/server'),
    config  = require('./config/server.app');

require('./server')(initter, config);
