'use strict';

require('babel/register')({ extensions: ['.js', '.jsx'] });

var express     = require('express'),
    compress    = require('compression'),
    parser      = require('body-parser'),
    cookies     = require('cookie-parser'),
    path        = require('path');

var appInitter  = require('./app/bundle/init/server.jsx'),
    noCache     = require('./server/no-cache'),
    log         = require('./server/log'),
    errors      = require('./server/errors'),
    config      = require('./config/server');

var app         = express(),
    appEnv      = app.get('env');


log(app, appEnv);

app.use(compress({ level: 5, memLevel: 5 }));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(cookies());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', noCache, appInitter);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app'));
app.use(errors);

app.set('port', config.appPort);

app.listen(app.get('port'), function() {
  console.log('> ' + config.env + ' server: running on port ' + this.address().port);
});
