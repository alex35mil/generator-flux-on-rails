import webpack from 'webpack';
import path    from 'path';
import fs      from 'fs';

import * as cfg from './webpack.shared.config';


export default {

  entry: {
    app: [
      `webpack-hot-middleware/client?path=${cfg.hotServerHost}/__webpack_hmr`,
      './app/bundles/app/initters/client',
    ],
    vendor: cfg.vendorModules.app,
  },

  output: {
    path      : path.join(process.cwd(), 'public', 'assets'),
    filename  : '[name].js',
    publicPath: `${cfg.hotServerHost}/assets`,
  },

  resolve : cfg.resolveParams,
  devtool : '#cheap-module-eval-source-map',
  debug   : true,
  progress: true,
  node    : { fs: 'empty' },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['app'],
      filename : 'vendor.js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      '__CLIENT__'  : true,
      '__SERVER__'  : false,
      '__DEV__'     : true,
      '__DEVTOOLS__': true,
      'process.env' : {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    function() {
      this.plugin('done', () => {
        const manifest = (
          path.join(process.cwd(), 'public', 'assets', cfg.manifestFile)
        );
        const chunkManifest = (
          path.join(process.cwd(), 'public', 'assets', cfg.chunkManifestFile)
        );
        const noContent = JSON.stringify({});

        fs.writeFileSync(manifest, noContent);      // eslint-disable-line
        fs.writeFileSync(chunkManifest, noContent); // eslint-disable-line
      });
    },
  ],

  module: {
    noParse: cfg.noParseTest,
    loaders: [
      {
        test   : cfg.jsLoaderTest,
        loader : 'babel',
        exclude: /node_modules/,
        query  : {
          plugins: [
            'transform-decorators-legacy',
            'typecheck',
            [
              'react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports  : ['react'],
                    locals   : ['module'],
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports  : ['react', 'redbox-react'],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        test   : cfg.cssLoaderTest,
        loaders: [
          'style',
          `css?${cfg.cssLoaderParams({ importLoaders: 1 })}`,
          'postcss',
        ],
      },
      {
        test   : cfg.scssLoaderTest,
        loaders: [
          'style',
          `css?${cfg.cssLoaderParams({ importLoaders: 3 })}`,
          'postcss',
          `sass?${cfg.sassLoaderParams}`,
          'sass-resources',
        ],
      },
      {
        test   : cfg.imagesLoaderTest,
        loaders: [
          `url?${cfg.urlLoaderParams}`,
          `image-webpack?${cfg.imagesLoaderParams({ bypassOnDebug: true })}`,
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
