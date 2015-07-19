import React          from 'react';
import { PropTypes }  from 'react';

import Meta           from './Meta';


export default class Head extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const meta = new Meta(this.props);

    return (

        <head>

          <base href="/" />
          <meta charSet="utf-8" />

          <title>{meta.pageTitle}</title>

          <meta name="viewport" content="width=device-width,initial-scale=1" />

          {!__DEV__ && <link rel="stylesheet" href={meta.cssAsset} />}

          <meta name="description"  content={meta.pageDescription} />
          <meta name="keywords"     content={meta.pageKeywords} />

          <meta property="og:type"        content={meta.pageType} />
          <meta property="og:title"       content={meta.pageTitle} />
          <meta property="og:site_name"   content={meta.siteName} />
          <meta property="og:url"         content={meta.pageUrl} />
          <meta property="og:description" content={meta.pageDescription} />
          <meta property="og:image"       content={meta.pageImage} />
          <meta property="fb:app_id"      content={meta.facebookAppId} />

          <link rel="shortcut icon"     href="/favicon.ico" />
          <link rel="apple-touch-icon"  href="/images/apple-touch-icon.png" />
          <link rel="image_src"         href={`${meta.appHost}/images/apple-touch-icon.png`} />

        </head>

    );

  }


}
