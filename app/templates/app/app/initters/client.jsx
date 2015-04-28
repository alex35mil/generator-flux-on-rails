import React      from 'react';
import Router     from 'react-router';
import NProgress  from 'nprogress';

import request    from '../api/request';
import mapper     from '../api/map';
import auth       from '../api/auth';
import config     from '../../config/server'


export default (routes, mappings, title) => {

  let Render = (Component, props) => {

    React.render(
        React.createElement(Component, props),
        document.getElementById('app')
    );

  };

  Router.run(routes, Router.HistoryLocation, (Handler, state) => {

    const apiCall = !mappings.isLocal(state.path);
    const apiPath = mappings.getApiPath(state.path);

    NProgress.configure({
      showSpinner: false,
      trickle    : true
    });
    NProgress.start();

    let auths = auth(document);

    let { params, path } = state;

    if (apiCall) {

      request({
        method: 'get',
        path  : apiPath,
        auth  : auths.getAuthHeaders(),
        cb    : (error, response) => {

          if (response.ok) {

            Render(Handler, {
              path,
              apiPath,
              params,
              data    : response.body,
              auth    : auths,
              loading : NProgress.start,
              loaded  : NProgress.done,
              setTitle: () => {
                document.title = `${response.body.title || title.base} | ${title.ending}`;
              }
            });

          }

          if (error) {

            /* Handle! */

          }

        }
      });

    } else {

      Render(Handler, {
        path,
        apiPath,
        params,
        auth    : auths,
        loading : NProgress.start,
        loaded  : NProgress.done,
        setTitle: () => {
          document.title = `${title.base} | ${title.ending}`;
        }
      });

    }

  });

}
