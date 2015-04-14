import request from 'superagent';

export default (params) => {

  let host    = params.host || '',
      apiPath = params.remoteApiCall ? '' : '/api',
      url     = host + apiPath + params.path;

  let req = request[params.method](url).type('json');

  if (params.apiName && params.apiVersion) {
    req.accept(`application/vnd.${params.apiName}.${params.apiVersion}+json`);
  }

  if (params.method === 'post' && params.data) {
    req.send(params.data);
  }

  req.end(params.cb);

}
