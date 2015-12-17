import logger from 'morgan';
import fs     from 'fs';

export default (app, env, bundle) => {

  if (env === 'production') {
    const logPath = `${process.cwd()}/logs/production.${bundle}.log`;
    const logStream = fs.createWriteStream(logPath, { flags: 'a' });
    app.use(logger('combined', { stream: logStream }));
  } else {
    app.use(logger('dev'));
  }

}
