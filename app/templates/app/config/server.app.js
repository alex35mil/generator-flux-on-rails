/* eslint no-process-env: 0 */

import config from './server';

config.bundle            = 'app';
config.appPort           = process.env.APP_PORT || 3500;

config.googleAnalyticsId = 'UA-XXXXXXXX-Y';
config.facebookAppId     = '123456789012345';

export default config;
