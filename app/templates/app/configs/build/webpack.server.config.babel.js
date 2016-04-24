import webpack      from 'webpack';
import escapeRegExp from 'escape-string-regexp';

import project  from '../../package.json';
import * as cfg from './webpack.shared.config';


export default {

  entry: {
    app: './server.app',
  },

  output: {
    path         : './build',
    filename     : '[name].js',
    libraryTarget: 'commonjs',
  },

  externals: (
    Object
      .keys(project.dependencies)
      .map(module => new RegExp(`^${escapeRegExp(module)}(?:\/.*)?$`))
  ),

  target: 'node',

  node: {
    __dirname : true,
    __filename: true,
  },

  resolve: cfg.resolveParams,
  devtool: '#sourcemap',

  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      '__CLIENT__'  : false,
      '__SERVER__'  : true,
      '__DEV__'     : cfg.nodeEnv !== 'production',
      '__DEVTOOLS__': false,
      'process.env' : {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],

  module: {
    noParse: cfg.noParseTest,
    loaders: [
      {
        test   : cfg.jsLoaderTest,
        loader : 'babel',
        exclude: /node_modules/,
        query  : {
          plugins: [ 'transform-decorators-legacy' ],
        },
      },
      {
        test   : cfg.cssLoaderTest,
        loaders: [
          `css/locals?${cfg.cssLoaderParams({ importLoaders: 0 })}`,
        ],
      },
      {
        test   : cfg.scssLoaderTest,
        loaders: [
          `css/locals?${cfg.cssLoaderParams({ importLoaders: 2 })}`,
          `sass?${cfg.sassLoaderParams}`,
          'sass-resources',
        ],
      },
      {
        test  : cfg.jsonLoaderTest,
        loader: 'json',
      },
      {
        test  : cfg.imagesLoaderTest,
        loader: `file?${cfg.fileLoaderParams}`,
      },
    ],
  },

  sassResources: cfg.sassResources,

}
