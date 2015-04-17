import request  from 'superagent';

import getPath  from './mappings'
import config   from '../../config/server';


export default (params) => {

  let api  = params.host || config.apiPath,
      path = getPath(params.path),
      url  = api + path;

  let req  = request[params.method](url)
              .type('json')
              .accept(`application/vnd.${config.apiName}.${config.apiVersion}+json`);

  if (params.method === 'post' && params.data) {
    req.send(params.data);
  }

  req.end(params.cb);

}
