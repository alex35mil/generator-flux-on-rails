'use strict';

require('babel/register')({
  extensions: ['.js', '.jsx'],
  stage     : 0
});

var initter = require('./app/bundles/app/initters/server'),
    config  = require('./config/server.app');

require('./server')(initter, config);
