import initter          from 'app/libs/initters/server';
import config           from 'configs/server/server.app';
import routes           from '../routes/routes';
import reducers         from '../reducers/reducers';
import Head             from '../layouts/head/Head';
import * as authActions from '../actions/authActions';

import getAsset         from 'app/libs/getAsset';
import setCookieDomain  from 'app/libs/setCookieDomain';


export default (req, res, next) => {

  const { bundle, facebookAppId } = config;

  const cookieDomain = setCookieDomain(req.headers.host);

  const params = {
    bundle,
    routes,
    reducers,
    Head,
    authActions,
    cookieDomain,
    facebookAppId,
    locals: {
      jsAsset    : getAsset(bundle, 'js'),
      cssAsset   : getAsset(bundle, 'css'),
      vendorAsset: getAsset('vendor', 'js'),
    },
  };

  initter(req, res, next, params);

}
