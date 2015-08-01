import polyfill         from 'babel/polyfill';  // eslint-disable-line no-unused-vars

import initter          from 'app/libs/initters/client';
import config           from 'config/server.app';
import routes           from '../routes/routes';
import reducers         from '../reducers/reducers';
import meta             from '../layouts/meta';
import setCookieDomain  from 'app/libs/setCookieDomain';


const cookieDomain = setCookieDomain(document.location.hostname);

const { googleAnalyticsId } = config;

const params = { routes, reducers, meta, cookieDomain, googleAnalyticsId };

export default initter(params);
