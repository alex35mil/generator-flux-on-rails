/*
 * ===== Meta
 *
 * title
 * description
 * keywords
 * type
 * url
 * image
 * siteName
 * appHost
 * cssAsset
 * facebookAppId
 *
 */

export default props => {

  const meta = {};

  const { state, route, /* location, params, */ appHost, fullPath, cssAsset, facebookAppId } = props;

  const base = {

    title        : 'Flux on Rails scaffolder',
    description  : 'Will scaffold Flux on Rails App for you.',
    keywords     : 'flux react redux rails',
    type         : 'website',
    image        : '/images/cover.png',
    siteName     : 'Flux on Rails scaffolder',
    facebookAppId: facebookAppId || null

  };


  meta.cssAsset      = cssAsset;
  meta.appHost       = appHost;

  meta.url           = appHost + fullPath;
  meta.image         = appHost + base.image;

  meta.type          = base.type;
  meta.siteName      = base.siteName;
  meta.facebookAppId = base.facebookAppId;


  switch (route) {

    case 'dummy':

      const hello = state.dummy.data;

      meta.title       = `${hello} This is page title for Dummy component!`;
      meta.description = base.description;
      meta.keywords    = base.keywords;
      break;


    case 'login':
      meta.title       = 'Login';
      meta.description = base.description;
      meta.keywords    = base.keywords;
      break;


    case 'not-found':
      meta.title       = 'Oops! Nothing here.';
      meta.description = '404';
      meta.keywords    = base.keywords;
      break;


    default:
      meta.title        = base.title;
      meta.description  = base.description;
      meta.keywords     = base.keywords;

  }

  if (meta.title !== base.title) {
    meta.title += ` | ${base.title}`;
  }

  return meta;

}
