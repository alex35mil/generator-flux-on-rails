import webpack      from 'webpack';
import path         from 'path';

import appConfig    from '../config/server.app';
import vendorDeps   from './vendors';


export default {

  entry: {
    app: [
      `webpack-dev-server/client?http://lvh.me:${appConfig.devPort}`,
      'webpack/hot/only-dev-server',
      './build/bundles/app.js'
    ],
    vendor: vendorDeps.app
  },

  output: {
    path      : path.join(process.cwd(), 'public', 'assets'),
    filename  : '[name].js',
    publicPath: `http://lvh.me:${appConfig.devPort}/assets`
  },

  resolve: {
    alias: {
      'app'   : path.join(process.cwd(), 'app'),
      'config': path.join(process.cwd(), 'config'),
      'public': path.join(process.cwd(), 'public')
    },
    extensions: ['', '.js', '.jsx']
  },

  devtool : '#eval',
  debug   : true,
  progress: true,
  node    : {
    fs: 'empty'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['app'],
      filename : 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      '__CLIENT__'  : true,
      '__SERVER__'  : false,
      '__DEV__'     : true,
      '__DEVTOOLS__': true,
      'process.env' : {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],

  module: {
    noParse: /\.min\.js$/,
    loaders: [
      { test  : /\.jsx?$/, loaders: ['react-hot', 'babel'],  exclude: /node_modules/ },
      {
        test  : /\.styl$/,
        loader: 'style!css!autoprefixer?{browsers:["last 2 version"], cascade:false}!stylus'
      },
      {
        test  : /\.css$/,
        loader: 'style!css!autoprefixer?{browsers:["last 2 version"], cascade:false}'
      }
    ]
  }


}
