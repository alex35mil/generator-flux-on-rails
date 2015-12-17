import config from 'configs/server/server.base';
import assets from 'public/assets/manifest.json';


export default (asset, type) => {

  if (__DEV__) {
    return `http://lvh.me:${config.devPort}/assets/${asset}.${type}`;
  } else {
    return `/assets/${assets[`${asset}.${type}`]}`;
  }

}
