let config = {};

config.env          = process.env.NODE_ENV  || 'development';

config.appPort      = process.env.APP_PORT  || 3500;

config.apiName      = '<%= name %>';
config.apiVersion   = 'v1';

config.apiPath      = '/api';

config.loginCookie  = 'api_login';
config.tokenCookie  = 'api_token';

config.loginHeader  = 'X-User-Email';
config.tokenHeader  = 'X-User-Token';


export default config;
