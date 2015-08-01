import React  from 'react';

import meta   from './meta';


export default class Head extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const {
      title,
      description,
      keywords,
      type,
      image,
      siteName,
      appHost,
      url,
      facebookAppId,
      cssAsset
    } = meta(this.props);

    return (

        <head>

          <base href="/" />
          <meta charSet="utf-8" />

          <title>{title}</title>

          <meta name="viewport" content="width=device-width,initial-scale=1" />

          {!__DEV__ && <link rel="stylesheet" href={cssAsset} />}

          <meta name="description"  content={description} />
          <meta name="keywords"     content={keywords} />

          <meta property="og:type"        content={type} />
          <meta property="og:title"       content={title} />
          <meta property="og:site_name"   content={siteName} />
          <meta property="og:url"         content={url} />
          <meta property="og:description" content={description} />
          <meta property="og:image"       content={image} />
          <meta property="fb:app_id"      content={facebookAppId} />

          <link rel="shortcut icon"     href="/favicon.ico" />
          <link rel="apple-touch-icon"  href="/images/apple-touch-icon.png" />
          <link rel="image_src"         href={`${appHost}/images/apple-touch-icon.png`} />

        </head>

    );

  }


}
