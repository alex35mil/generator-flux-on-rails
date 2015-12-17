import React from 'react';

import RequestError from 'app/libs/RequestError';


export default class NotFound extends React.Component {

  render() {
    // FIXME: This should throw 404 on server
    //        and render `not found` view on client
    throw new RequestError(404);
  }

}
