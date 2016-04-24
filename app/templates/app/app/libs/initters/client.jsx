import React                      from 'react';
import ReactDOM                   from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider }               from 'react-redux';
import transit                    from 'transit-immutable-js';
import NProgress                  from 'nprogress';

import initStore from 'app/libs/initters/store';
import Auth      from 'app/libs/Auth';
import setTitle  from 'app/libs/setPageTitle';
import analytics from 'app/libs/analytics';


export default (params) => {
  const { reducers } = params;
  const initialState = transit.fromJSON(window.__DATA__);
  const store        = initStore({ reducers, initialState });
  const routes       = params.routes(store);
  const authAgent    = new Auth(document, params.cookieDomain);

  if (params.googleAnalyticsId) {
    analytics.init(params.googleAnalyticsId);
  }

  let isInitialRender = true;

  const elementCreator = (Component, props) => {

    NProgress.configure({
      showSpinner: false,
      trickle    : true,
    });

    if (props.route.name === 'app') {
      NProgress.start();
      analytics.sendPageview(props.location.pathname);
    }

    return (
      <Component
        store={store}
        loadingProgress={NProgress}
        authAgent={authAgent}
        isInitialRender={isInitialRender}
        setTitle={setTitle}
        getMeta={params.getMeta}
        {...props}
      />
    );

  };

  const AppContainer = (
    <Provider store={store}>
      <Router
        history={browserHistory}
        children={routes}
        createElement={elementCreator}
      />
    </Provider>
  );

  const appDOMNode = document.getElementById('app');

  ReactDOM.render(AppContainer, appDOMNode, () => isInitialRender = false);
}
