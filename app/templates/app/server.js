import express      from 'express';
import compressor   from 'compression';
import parser       from 'body-parser';
import cookies      from 'cookie-parser';
import path         from 'path';

import noCache      from './server/noCache';
import errors       from './server/errors';
import logger       from './server/log';


export default (initter, config) => {

  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEV__    = config.env !== 'production';

  const app = express();

  const appEnv = app.get('env');

  logger(app, appEnv, config.bundle);

  app.use(compressor());

  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));

  app.use(cookies());

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', noCache, initter);

  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'app'));
  app.use(errors);

  app.set('port', config.appPort);

  app.listen(app.get('port'), function() {
    console.log(`=> 🚀  Express ${config.bundle} ${config.env} server is running on port ${this.address().port}`);  // eslint-disable-line no-console
  });

}
