import React      from 'react';
import Router     from 'react-router';
import NProgress  from 'nprogress';

import request    from '../api/request';


export default (routes, title) => {

  Router.run(routes, Router.HistoryLocation, (Handler, state) => {

    NProgress.configure({
      showSpinner: false,
      trickle    : true
    });
    NProgress.start();

    request({
      method: 'get',
      path  : state.path,
      cb    : (error, response) => {

        if (response.ok) {

          let { params, path } = state;

          React.render(
              React.createElement(Handler, {
                path    : path,
                params  : params,
                data    : response.body,
                loaded  : NProgress.done,
                setTitle: () => {
                  document.title = `${response.body.title || title.base} | ${title.ending}`;
                }
              }),
              document.getElementById('app')
          );

        }

        if (error) {

          /* Handle! */

        }

      }
    });

  });

}
