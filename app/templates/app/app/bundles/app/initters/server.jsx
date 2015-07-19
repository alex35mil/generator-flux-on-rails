import initter            from 'app/libs/initters/server';
import config             from 'config/server.app';
import routes             from '../routes/routes';
import reducers           from '../reducers/reducers';
import Head               from '../layouts/Head';
import * as AuthActions   from '../actions/AuthActions';

import getAsset           from 'app/libs/getAsset';
import setCookieDomain    from 'app/libs/setCookieDomain';


export default (req, res, next) => {

  const { bundle, facebookAppId } = config;

  const cookieDomain = setCookieDomain(req.headers.host);

  const params = {

    bundle,
    routes,
    reducers,
    Head,
    AuthActions,
    cookieDomain,
    facebookAppId,

    locals: {

      jsAsset    : getAsset(bundle, 'js'),
      cssAsset   : getAsset(bundle, 'css'),
      vendorAsset: getAsset('vendor', 'js')

    }

  };

  initter(req, res, next, params);

}
