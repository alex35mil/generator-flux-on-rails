import initter  from '../../initters/server';
import routes   from '../routes';
import shared   from './shared';

import asset    from '../../shared/js/helpers/asset';
import assets   from '../layout/data/assets.json';


export default (req, res, next) => {

  const layout = `${process.cwd()}/app/bundle/layout/layout.jade`;

  let locals = {

    jsAsset     : asset(assets, 'app', 'js'),
    cssAsset    : asset(assets, 'app', 'css'),
    vendorAsset : asset(assets, 'vendor', 'js'),

    titleDefault: shared.title.base,
    titleBase   : shared.title.ending

  };

  initter(req, res, next, routes, layout, locals);

}