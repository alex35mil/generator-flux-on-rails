import webpack       from 'webpack';
import Extract       from 'extract-text-webpack-plugin';
import Gzip          from 'compression-webpack-plugin';
import Manifest      from 'webpack-manifest-plugin';
import ChunkManifest from 'chunk-manifest-webpack-plugin';
import path          from 'path';

import * as cfg from './webpack.shared.config';


export default {

  entry: {
    app   : './app/bundles/app/initters/client',
    vendor: cfg.vendorModules.app,
  },

  output: {
    path         : path.join(process.cwd(), 'public', 'assets'),
    filename     : '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  resolve : cfg.resolveParams,
  devtool : false,
  debug   : false,
  progress: true,
  node    : { fs: 'empty' },

  plugins: [
    new Extract('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['app'],
      filename : 'vendor-[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      '__CLIENT__'  : true,
      '__SERVER__'  : false,
      '__DEV__'     : false,
      '__DEVTOOLS__': false,
      'process.env' : {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new Manifest({
      fileName: cfg.manifestFile,
    }),
    new ChunkManifest({
      filename        : cfg.chunkManifestFile,
      manifestVariable: '__CHUNKS__',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'warnings'     : false,
        'drop_debugger': true,
        'drop_console' : true,
        'pure_funcs'   : ['console.log'],
      },
    }),
    new Gzip({
      asset    : '{file}.gz',
      algorithm: 'gzip',
      regExp   : /\.js$|\.css$/,
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
        test  : cfg.cssLoaderTest,
        loader: Extract.extract(
          'style',
          `css?${cfg.cssLoaderParams({ importLoaders: 1 })}` +
          `!postcss`
        ),
      },
      {
        test  : cfg.scssLoaderTest,
        loader: Extract.extract(
          'style',
          `css?${cfg.cssLoaderParams({ importLoaders: 3 })}` +
          `!postcss` +
          `!sass?${cfg.sassLoaderParams}` +
          'sass-resources'
        ),
      },
      {
        test   : cfg.imagesLoaderTest,
        loaders: [
          `url?${cfg.urlLoaderParams}`,
          `image-webpack?${cfg.imagesLoaderParams({ bypassOnDebug: false })}`,
        ],
      },
      {
        test  : cfg.fontsLoaderTest,
        loader: `url?${cfg.urlLoaderParams}`,
      },
    ],
  },

  postcss      : cfg.postcssModules,
  sassResources: cfg.sassResources,

}
