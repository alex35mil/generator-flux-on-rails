import React                from 'react';
import Router               from 'react-router';
import BrowserHistory       from 'react-router/lib/BrowserHistory';
import { combineReducers }  from 'redux';
import { applyMiddleware }  from 'redux';
import { createStore }      from 'redux';
import { Provider }         from 'react-redux';
import middleware           from 'redux-thunk';
import NProgress            from 'nprogress';

import Auth                 from 'app/libs/Auth';
import setTitle             from 'app/libs/setPageTitle';
import analytics            from 'app/libs/analytics';


export default params => {

  const reducer   = combineReducers(params.reducers);
  const store     = applyMiddleware(middleware)(createStore)(reducer, window.__DATA__);

  const history   = new BrowserHistory();

  const authAgent = new Auth(document, params.cookieDomain);

  const routes    = params.routes({ store });


  if (params.googleAnalyticsId) {
    analytics.init(params.googleAnalyticsId);
  }


  let initialRender = true;

  const appComponent = (Component, props) => {

    NProgress.configure({
      showSpinner: false,
      trickle    : true
    });

    if (props.route.name === 'app') {
      NProgress.start();
      analytics.sendPageview(props.location.pathname);
    }

    return (
      <Component
          store={store}
          loader={NProgress}
          authAgent={authAgent}
          initialRender={initialRender}
          setTitle={setTitle}
          meta={params.meta}
          {...props}
      />
    );

  };

  const AppContainer = (
    <Provider store={store}>
      {() => <Router history={history} children={routes} createElement={appComponent} />}
    </Provider>
  );

  const appDOMNode = document.getElementById('app');

  React.render(AppContainer, appDOMNode, () => initialRender = false);

}
