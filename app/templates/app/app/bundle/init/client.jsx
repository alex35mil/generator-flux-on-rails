import polyfill   from 'babel/polyfill';

import initter    from '../../initters/client';
import routes     from '../routes/routes';
import mappings   from '../routes/mappings';
import shared     from './shared';

export default initter(routes, mappings, shared.title);
