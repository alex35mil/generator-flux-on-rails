/*
 * ===== Meta
 *
 * pageTitle
 * pageDescription
 * pageKeywords
 * pageType
 * pageUrl
 * pageImage
 * siteName
 * fbAppId
 * appHost
 * cssAsset
 *
 */

export default class Meta {


  constructor(props) {

    const base = {

      pageTitle      : 'Flux on Rails scaffolder',
      pageDescription: 'Will scaffold Flux on Rails App for you.',
      pageKeywords   : 'flux react redux rails',
      pageType       : 'website',
      pageImage      : '/images/cover.png',
      siteName       : 'Flux on Rails scaffolder',
      facebookAppId  : props.facebookAppId || null

    };

    const { state, route, appHost, fullPath, cssAsset } = props;

    this.cssAsset      = cssAsset;
    this.appHost       = appHost;

    this.pageUrl       = appHost + fullPath;
    this.pageImage     = appHost + base.pageImage;

    this.pageType      = base.pageType;
    this.siteName      = base.siteName;
    this.facebookAppId = base.facebookAppId;


    switch (route) {

      case 'dummy':
        this.pageTitle       = 'Hi! This is page title for Dummy component!';
        this.pageDescription = base.pageDescription;
        this.pageKeywords    = base.pageKeywords;
        break;

      case 'login':
        this.pageTitle       = 'Login';
        this.pageDescription = base.pageDescription;
        this.pageKeywords    = base.pageKeywords;
        break;

      case 'not-found':
        this.pageTitle       = `Oops! Nothing here.`;
        this.pageDescription = '404';
        this.pageKeywords    = base.pageKeywords;
        break;

      default:
        this.pageTitle        = base.pageTitle;
        this.pageDescription  = base.pageDescription;
        this.pageKeywords     = base.pageKeywords;

    }

    if (this.pageTitle !== base.pageTitle) {
      this.pageTitle += ` | ${base.pageTitle}`;
    }

  }


  getTitle() {

    return this.pageTitle;

  }


}
