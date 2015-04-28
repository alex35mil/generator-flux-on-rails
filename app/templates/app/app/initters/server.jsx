import React    from 'react';
import Router   from 'react-router';
import Jade     from 'jade';

import request  from '../api/request';
import mapper   from '../api/map';
import auth     from '../api/auth';


export default (req, res, next, opts) => {

  let Render = (Component, props, title) => {

    let { layout, locals } = opts;

    locals.title = `${title || locals.titleDefault} | ${locals.titleBase}`;
    locals.body  = React.renderToString(React.createElement(Component, props));

    let jaded = Jade.compileFile(layout, { pretty: true });
    let html  = jaded(locals);

    res.send(html);

  };

  Router
      .create({
        routes: opts.routes,
        location: req.url,
        onAbort: (redirect) => {
          res.redirect(302, redirect.to);
        }
      })
      .run((Handler, state) => {

        const apiCall = !opts.mappings.isLocal(state.path);
        const apiHost = `${req.protocol}://api.${req.headers.host}`;
        const apiPath = opts.mappings.getApiPath(state.path);

        let auths = auth(req);

        let { params, path } = state;

        if (apiCall) {

          request({
            method: 'get',
            host  : apiHost,
            path  : apiPath,
            auth  : auths.getAuthHeaders(),
            cb    : (error, response) => {

              if (error) {
                let err = new Error();
                err.status = error.status;
                return next(err);
              }

              Render(Handler, {
                path, apiPath, params, data: response.body, auth: auths
              }, response.body.title);

            }
          });

        } else {

          Render(Handler, { path, apiPath, params, auth: auths });

        }

      });

}
