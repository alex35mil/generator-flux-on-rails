import 'babel-polyfill';

import server  from './server';
import initter from './app/bundles/app/initters/server';
import config  from './configs/server/server.app';

server(initter, config);
