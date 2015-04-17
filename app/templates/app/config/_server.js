let config = {};

config.env        = process.env.NODE_ENV  || 'development';

config.appPort    = process.env.APP_PORT  || 3500;

config.apiName    = '<%= name %>';
config.apiVersion = 'v1';

config.apiPath    = '/api';


export default config;
