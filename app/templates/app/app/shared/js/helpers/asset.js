import config   from '../../../../config/server';

const isDevEnv = config.env !== 'production';

export default (assets, asset, type) => {
  let _asset;
  if (isDevEnv) {
    _asset = `${asset}.${type}`;
  } else {
    _asset = (
        assets.filter(el => el.name.match(new RegExp(`^${asset}-.*\\.${type}$`)))[0]['name']
    );
  }
  return _asset;
}
