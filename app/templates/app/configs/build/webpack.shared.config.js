import path         from 'path';
import autoprefixer from 'autoprefixer';

import config       from '../server/server.base';


export const nodeEnv       = config.env;
export const hotServerHost = `http://lvh.me:${config.devPort}`;

export const vendorModules = {

  app: [
    'babel-polyfill',
    'normalize.css',
    'axios',
    'classnames',
    'cookie',
    'history',
    'immutable',
    'mirror-creator',
    'normalizr',
    'nprogress',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-thunk',
    'transit-immutable-js',
  ],

};

export const resolveParams = {

  alias: {
    'app'    : path.join(process.cwd(), 'app'),
    'configs': path.join(process.cwd(), 'configs'),
    'public' : path.join(process.cwd(), 'public'),
  },

  extensions: ['', '.js', '.jsx'],

};

export const manifestFile      = 'manifest.json';
export const chunkManifestFile = 'chunk-manifest.json';

export const noParseTest      = /\.min\.js$/;
export const jsLoaderTest     = /\.jsx?$/;
export const cssLoaderTest    = /\.css$/;
export const scssLoaderTest   = /\.scss$/;
export const imagesLoaderTest = /\.(jpe?g|png|gif|svg|ico)$/;
export const fontsLoaderTest  = /\.(woff2?|ttf|eot|svg)$/;
export const jsonLoaderTest   = /\.json$/;

export const cssLoaderParams = (params) => (
  JSON.stringify({
    modules       : true,
    importLoaders : params.importLoaders,
    localIdentName: '[name]__[local]__[hash:base64:5]',
  })
);

export const sassLoaderParams = (
  JSON.stringify({
    includePaths: [ process.cwd() ],
  })
);

export const imagesLoaderParams = (params) => (
  JSON.stringify({
    bypassOnDebug: params.bypassOnDebug,
    /* Uncomment this if you use SVG fonts */
    // svgo: {
    //   plugins: [ { removeUselessDefs: false } ],
    // },
  })
);

export const fileLoaderParams = 'name=[name]-[hash].[ext]';
export const urlLoaderParams  = `limit=10000&${fileLoaderParams}`;

export const postcssModules = [ autoprefixer ];
export const sassResources  = [
  './app/assets/styles/imports/media.scss',
  './app/assets/styles/imports/fonts.scss',
  './app/assets/styles/imports/elements.scss',
  './app/bundles/app/layouts/styles/imports/layout.scss',
  './app/bundles/app/layouts/styles/imports/colors.scss',
  './app/bundles/app/layouts/styles/imports/fonts.scss',
  './app/bundles/app/layouts/styles/imports/effects.scss',
  './app/bundles/app/layouts/styles/imports/z-index.scss',
];
