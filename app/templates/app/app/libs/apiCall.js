import request  from 'axios';

import config   from 'config/server';


export default params => {

  const method       = params.method;
  const url          = `${params.host || config.apiPath}${params.path}`;
  const responseType = 'json';

  const headers = {
    'Content-Type': 'application/json',
    'Accept'      : `application/vnd.${config.apiName}.${config.apiVersion}+json`
  };

  if (params.auth) Object.assign(headers, params.auth);

  const requestParams = { method, url, responseType, headers };

  if (params.data) requestParams.data = params.data;

  return request(requestParams);

}
