import webpackDevConfig   from './webpack.config.dev';
import webpackProdConfig  from './webpack.config.prod';
import webpackCallback    from './webpack.callback';


const _app    = './app';
const _public = './public';
const _assets = `${_app}/assets`;


export default isDevBuild => {

  return {

    webpack: {
      config: isDevBuild ? webpackDevConfig : webpackProdConfig,
      cb    : webpackCallback
    },

    server: {
      paths: ['./server.app.js']
    },

    images: {
      src     : _assets + '/images/**',
      dest    : _public + '/images/',
      imagemin: {}
    },

    copy: {
      from : _assets,
      files: [
        [ '/fonts'                   ],
        [ '/tinies/favicon.ico', '/' ],
        [ '/tinies/robots.txt',  '/' ]
      ],
      to: _public
    },

    watch: {
      root : _assets,
      files: [
        '/fonts/**',
        '/images/**',
        '/json/**'
      ]
    },

    clean: [ _public ]

  };

}
