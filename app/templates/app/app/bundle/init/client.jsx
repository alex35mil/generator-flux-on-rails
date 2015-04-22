import polyfill   from 'babel/polyfill';

import initter    from '../../initters/client';
import routes     from '../routes';
import shared     from './shared';

export default initter(routes, shared.title);
