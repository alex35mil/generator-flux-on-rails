import logger   from 'morgan';
import fs       from 'fs';
import path     from 'path';

export default (app, env) => {

  if (env === 'production') {
    let logStream = fs.createWriteStream(`${process.cwd()}/log/production.log`, { flags: 'a' });
    app.use(logger('combined', { stream: logStream }));
  } else {
    app.use(logger('dev'));
  }

};
