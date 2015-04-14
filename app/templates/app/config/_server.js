let config = {};

config.env        = process.env.NODE_ENV  || 'development';

config.host       = process.env.API_HOST  || 'http://api.lvh.me';

config.appPort    = process.env.APP_PORT  || 3500;
config.apiPort    = process.env.API_PORT  || 3000;

config.apiName    = '<%= name %>';
config.apiVersion = 'v1';

config.apiPath    = '/api';


export default config;
