import React                from 'react';
import Router               from 'react-router';
import Location             from 'react-router/lib/Location';
import { combineReducers }  from 'redux';
import { applyMiddleware }  from 'redux';
import { createStore }      from 'redux';
import { Provider }         from 'react-redux';
import middleware           from 'redux-thunk';
import serialize            from 'serialize-javascript';
import jade                 from 'jade';

import Auth                 from 'app/libs/Auth';
import populateState        from 'app/libs/populateState';
import apiCall              from 'app/libs/apiCall';


export default async (req, res, next, params) => {

  const reducer   = combineReducers(params.reducers);
  const store     = applyMiddleware(middleware)(createStore)(reducer);

  const location  = new Location(req.path, req.query);

  const authAgent = new Auth(req, params.cookieDomain);

  const appHost   = `${req.protocol}://${req.headers.host}`;
  const apiHost   = `${req.protocol}://api.${req.headers.host}`;

  if (authAgent.isLoggedIn()) {

    await apiCall({
      method: 'GET',
      host  : apiHost,
      path  : '/auth/preflight',
      auth  : authAgent.getAuthHeaders()
    })
      .then(response => {
        return (
          store.dispatch(params.AuthActions.setLoggedInState(authAgent.getLogin()))
        );
      })
      .catch(response => {
        return (
          response.status === 401 ? authAgent.logout() : false
        );
      });

  }

  const routes = params.routes({ store });

  Router.run(routes, location, async (error, initialState, transition) => {

    if (error) {
      const err = new Error();
      err.status = error.status || 500;
      return next(err);
    }

    if (transition.isCancelled) {
      return res.redirect(302, transition.redirectInfo.pathname);
    }

    try {

      await populateState(initialState.components, {
        apiHost : apiHost,
        auth    : authAgent.getAuthHeaders(),
        dispatch: store.dispatch,
        location: initialState.location,
        params  : initialState.params
      });

      const state = store.getState();

      const { bundle, locals, facebookAppId } = params;

      locals.head = React.renderToStaticMarkup(
        React.createElement(params.Head, {
          state,
          appHost,
          facebookAppId,
          fullPath: req.url,
          route   : initialState.branch[1].name,
          location: initialState.location,
          params  : initialState.params,
          cssAsset: locals.cssAsset
        })
      );

      locals.body = React.renderToString(
        <Provider store={store}>
          {() => <Router location={location} {...initialState} />}
        </Provider>
      );

      const chunks = __DEV__ ? {} : require('public/assets/chunk-manifest.json');

      locals.chunks = serialize(chunks);
      locals.data   = serialize(state);

      const layout = `${process.cwd()}/app/bundles/${bundle}/layouts/Layout.jade`;
      const html   = jade.compileFile(layout, { pretty: false })(locals);

      res.send(html);

    } catch (err) {

      res.status(500).send(err.stack);

    }

  });

}
