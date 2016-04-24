import React                    from 'react';
import ReactDOM                 from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider }             from 'react-redux';
import transit                  from 'transit-immutable-js';
import serialize                from 'serialize-javascript';
import jade                     from 'jade';

import initStore     from 'app/libs/initters/store';
import populateState from 'app/libs/populateState';
import getRouteName  from 'app/libs/getRouteName';
import Auth          from 'app/libs/Auth';
import apiCall       from 'app/libs/apiCall';
import chunks        from 'public/assets/chunk-manifest.json';


export default async (req, res, next, params) => {

  const { reducers } = params;
  const store        = initStore({ reducers });
  const location     = req.url;
  const routes       = params.routes(store);
  const authAgent    = new Auth(req, params.cookieDomain);

  const appHost = `${req.protocol}://${req.headers.host}`;
  const apiHost = `${req.protocol}://api.${req.headers.host}`;

  if (authAgent.isLoggedIn()) {

    await apiCall({
      method: 'GET',
      host  : apiHost,
      path  : '/auth/preflight',
      auth  : authAgent.getAuthHeaders(),
    })
      .then(response => (
        store.dispatch(
          params.authActions.setLoggedInState(authAgent.getLogin())
        )
      ))
      .catch(response => (
        response.status === 401 ? authAgent.logout() : false
      ));

  }

  match({ routes, location }, async (error, redirect, props) => {

    if (error) {
      const err = new Error();
      err.status  = error.status || 500;
      err.message = error.message;
      return next(err);
    }


    if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search);
    }


    if (props) {

      try {

        await populateState(props.components, {
          apiHost : apiHost,
          auth    : authAgent.getAuthHeaders(),
          dispatch: store.dispatch,
          location: props.location,
          params  : props.params,
        });

        const state = store.getState();

        const { bundle, locals, Head, facebookAppId } = params;

        locals.head = ReactDOM.renderToStaticMarkup(
          <Head
            state={state}
            appHost={appHost}
            facebookAppId={facebookAppId}
            fullPath={req.url}
            route={getRouteName(props.routes)}
            location={props.location}
            params={props.params}
            cssAsset={locals.cssAsset}
          />
        );

        locals.body = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );

        locals.chunks = serialize(chunks);
        locals.data   = serialize(transit.toJSON(state));

        const layout = (
          `${process.cwd()}/app/bundles/${bundle}/layouts/Layout.jade`
        );
        const html = jade.compileFile(layout, { pretty: false })(locals);

        return res.send(html);

      } catch (err) {

        return res.status(500).send(err.stack);

      }
    }

    return res.send(404, 'Not found');

  });

}
