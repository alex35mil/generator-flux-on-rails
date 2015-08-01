import config   from 'config/server';


export default (asset, type) => {

  if (__DEV__) {

    return `http://lvh.me:${config.devPort}/assets/${asset}.${type}`;

  } else {

    const assets = require('public/assets/manifest.json');

    return `/assets/${assets[`${asset}.${type}`]}`;

  }

}
