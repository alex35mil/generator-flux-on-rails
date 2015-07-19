import config   from 'config/server.app';
import assets   from '../../public/assets/assets.json';


export default (asset, type) => {

  if (__DEV__) {

    return `http://lvh.me:${config.devPort}/assets/${asset}.${type}`;

  } else {

    const assetRegExp = new RegExp(`^${asset}-[a-zA-Z0-9]{15,}\\.${type}$`);
    const assetFile   = assets.filter(el => el.name.match(assetRegExp))[0]['name'];

    return `/assets/${assetFile}`;

  }

}
