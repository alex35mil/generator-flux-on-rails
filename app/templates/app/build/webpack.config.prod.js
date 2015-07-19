import webpack      from 'webpack';
import extract      from 'extract-text-webpack-plugin';
import gzip         from 'compression-webpack-plugin';
import fs           from 'fs';
import path         from 'path';

import vendorDeps   from './vendors';


export default {

  entry: {
    app   : './build/bundles/app.js',
    vendor: vendorDeps.app
  },

  output: {
    path    : './public/assets',
    filename: '[name]-[chunkhash].js'
  },

  resolve: {
    alias: {
      app   : path.join(process.cwd(), 'app'),
      config: path.join(process.cwd(), 'config')
    },
    extensions: ['', '.js', '.jsx']
  },

  devtool : false,
  debug   : false,
  progress: true,
  node    : {
    fs: 'empty'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new extract('[name]-[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['app'],
      filename : 'vendor-[chunkhash].js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      __CLIENT__   : true,
      __SERVER__   : false,
      __DEV__      : false,
      __DEVTOOLS__ : false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings     : false,
        drop_debugger: true,
        drop_console : true
      }
    }),
    new gzip({
      asset    : '{file}.gz',
      algorithm: 'gzip',
      regExp   : /\.js$|\.css$/
    }),
    function() {
      this.plugin('done', stats => {
        fs.writeFileSync(
            path.join('./public', 'assets', 'assets.json'),
            JSON.stringify(stats.toJson().assets)
        );
      });
    }
  ],

  module: {
    noParse: /\.min\.js$/,
    loaders: [
      { test  : /\.jsx?$/, loader: 'babel?stage=0',  exclude: /node_modules/ },
      {
        test  : /\.styl$/,
        loader: extract.extract('style', 'css!autoprefixer?{browsers:["last 2 version"], cascade:false}!stylus')
      },
      {
        test  : /\.css$/,
        loader: extract.extract('style', 'css!autoprefixer?{browsers:["last 2 version"], cascade:false}')
      }
    ]
  }


}
