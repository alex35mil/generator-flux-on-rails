"use strict";

var _app    = './app',
    _public = './public';

module.exports = function(isDevBuild) {

  return {

    webpack: {
      config  : require('./webpack.config.js')(isDevBuild),
      cb      : require('./webpack.callback.js')
    },

    server: {
      path: './server.js'
    },

    lint: {
      src: '.'
    },

    copy: {
      base: _app + '/statics',
      from: [
        '/favicon.ico',
        '/robots.txt'
      ],
      to: _public
    },

    clean: [ _public ]

  };

};
