import polyfill         from 'babel/polyfill';

import initter          from 'app/libs/initters/client';
import config           from 'config/server.app';
import routes           from '../routes/routes';
import reducers         from '../reducers/reducers';
import Meta             from '../layouts/Meta';
import setCookieDomain  from 'app/libs/setCookieDomain';


const cookieDomain = setCookieDomain(document.location.hostname);

const { googleAnalyticsId } = config;

const params = { routes, reducers, Meta, cookieDomain, googleAnalyticsId };

export default initter(params);
