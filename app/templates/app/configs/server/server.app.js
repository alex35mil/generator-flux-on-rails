/* eslint no-process-env: 0 */

import baseConfig from './server.base';

const appConfig = {

  bundle           : 'app',
  appPort          : process.env.APP_PORT || 3500,

  googleAnalyticsId: 'UA-XXXXXXXX-Y',
  facebookAppId    : '123456789012345',

};

export default Object.assign({}, baseConfig, appConfig);
