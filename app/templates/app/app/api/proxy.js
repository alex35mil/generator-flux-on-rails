import request  from './request';
import getPath  from './mappings';
import config   from '../../config/server';

export default (req, res) => {

  const apiMethod = req.method.toString().toLowerCase(),
        apiHost   = `${config.host}:${config.apiPort}`,
        apiPath   = getPath(req.url);

  let reqParams = {
    method       : apiMethod,
    host         : apiHost,
    path         : apiPath,
    apiName      : config.apiName,
    apiVersion   : config.apiVersion,
    remoteApiCall: true,
    cb           : (error, response) => {

      if (error) {
        res
            .status(error.status)
            .send({ error: error.status });
      } else {
        res
            .send(response.body);
      }

    }
  };

  if (apiMethod === 'post' && req.body) reqParams.data = req.body;

  request(reqParams);

}
