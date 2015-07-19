/* eslint no-process-env: 0 */

let config = {};

config.env          = process.env.NODE_ENV  || 'development';

config.devPort      = 3001;

config.apiName      = '<%= name %>';
config.apiVersion   = 'v1';

config.apiPath      = '/api';

config.loginCookie  = 'api_login';
config.tokenCookie  = 'api_token';

config.loginHeader  = 'X-User-Email';
config.tokenHeader  = 'X-User-Token';


export default config;
