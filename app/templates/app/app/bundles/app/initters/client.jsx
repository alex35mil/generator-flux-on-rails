import initter         from 'app/libs/initters/client';
import setCookieDomain from 'app/libs/setCookieDomain';
import config          from 'configs/server/server.app';
import routes          from '../routes/routes';
import reducers        from '../reducers/reducers';
import getMeta         from '../layouts/head/getMeta';


const cookieDomain = setCookieDomain(document.location.hostname);

const { googleAnalyticsId } = config;

const params = { routes, reducers, getMeta, cookieDomain, googleAnalyticsId };

export default initter(params);
