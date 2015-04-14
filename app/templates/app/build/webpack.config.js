"use strict";

var webpack = require('webpack'),
    extract = require('extract-text-webpack-plugin'),
    gzip    = require('compression-webpack-plugin'),
    fs      = require('fs'),
    path    = require('path');

module.exports = function(isDevBuild) {

  var chunkHash = isDevBuild ? '' : '-[chunkhash]';

  return {

    entry: {
      app   : './build/bundles/app.js',
      vendor: ['react', 'react-router', 'superagent', 'nprogress']
    },

    output: {
      path    : './public/assets',
      filename: '[name]' + chunkHash + '.js'
    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    devtool: isDevBuild && '#eval',
    debug  : isDevBuild,

    plugins: [
      new extract('[name]' + chunkHash + '.css'),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor' + chunkHash + '.js'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: !isDevBuild,
          drop_console : !isDevBuild
        }
      }),
      new gzip({
        asset: '{file}.gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.css$/
      }),
      function() {
        this.plugin('done', function(stats) {
          fs.writeFileSync(
              path.join('./app', 'bundle', 'layout', 'data', 'assets.json'),
              JSON.stringify(stats.toJson().assets)
          );
        });
      }
    ],

    module: {
      noParse: /\.min\.js$/,
      loaders: [
        { test  : /\.jsx?$/, loader: 'babel-loader',  exclude: /node_modules/ },
        {
          test  : /\.styl$/,
          loader: extract.extract('style-loader', 'css-loader!autoprefixer-loader?{browsers:["last 2 version"], cascade:false}!stylus-loader')
        },
        {
          test  : /\.css$/,
          loader: extract.extract('style-loader', 'css-loader!autoprefixer-loader?{browsers:["last 2 version"], cascade:false}')
        }
      ]
    }

  };

};
