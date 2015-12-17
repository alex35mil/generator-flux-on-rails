/* eslint no-console: 0 */

import express    from 'express';
import compressor from 'compression';
import parser     from 'body-parser';
import cookies    from 'cookie-parser';
import path       from 'path';

import noCacheMiddleware from './middlewares/noCacheMiddleware';
import errorsMiddleware  from './middlewares/errorsMiddleware';
import loggerMiddleware  from './middlewares/loggerMiddleware';


export default (initter, config) => {

  const server = express();

  const serverEnv = server.get('env');

  loggerMiddleware(server, serverEnv, config.bundle);

  server.use(compressor());

  server.use(parser.json());
  server.use(parser.urlencoded({ extended: true }));

  server.use(cookies());

  server.use(express.static(path.join(__dirname, 'public')));

  server.use('/', noCacheMiddleware, initter);

  server.set('view engine', 'jade');
  server.set('views', path.join(__dirname, 'app'));
  server.use(errorsMiddleware);

  server.set('port', config.appPort);

  server.listen(server.get('port'), function() {
    const { bundle, env } = config;
    const expressPort = this.address().port;
    console.log(
      `=> 🚀  Express ${bundle} ${env} server is running on port ${expressPort}`
    );
  });

}
