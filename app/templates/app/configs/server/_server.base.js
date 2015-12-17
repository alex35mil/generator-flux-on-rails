/* eslint no-process-env: 0 */

export default {

  env        : process.env.NODE_ENV  || 'development',

  devPort    : 3001,

  apiName    : '<%= name %>',
  apiVersion : 'v1',

  apiPath    : '/api',

  loginCookie: 'api_login',
  tokenCookie: 'api_token',

  loginHeader: 'X-User-Email',
  tokenHeader: 'X-User-Token',

};
