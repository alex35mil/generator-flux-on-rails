import request  from 'superagent';

import config   from '../../config/server';


export default (params) => {

  let api  = params.host || config.apiPath,
      path = params.path,
      url  = api + path;

  let req  = request[params.method](url)
              .type('json')
              .accept(`application/vnd.${config.apiName}.${config.apiVersion}+json`);

  if (params.auth) {
    req.set(params.auth);
  }

  if (params.method === 'post' && params.data) {
    req.send(params.data);
  }

  req.end(params.cb);

}
