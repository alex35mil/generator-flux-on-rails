'use strict';

require('babel/register')({ extensions: ['.js', '.jsx'] });

var express   = require('express'),
    compress  = require('compression'),
    parser    = require('body-parser'),
    path      = require('path');

var app       = express(),
    appEnv    = app.get('env');

var proxy     = require('./app/api/proxy'),
    renderer  = require('./app/bundle/init/server.jsx'),
    noCache   = require('./server/no-cache'),
    log       = require('./server/log'),
    errors    = require('./server/errors'),
    config    = require('./config/server');


log(app, appEnv);

app.use(compress({ level: 5, memLevel: 5 }));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(config.apiPath, noCache, proxy);
app.use('/', noCache, renderer);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app'));
app.use(errors);

app.set('port', config.appPort);

app.listen(app.get('port'), function() {
  console.log('> ' + config.env + ' server: running on port ' + this.address().port);
});
