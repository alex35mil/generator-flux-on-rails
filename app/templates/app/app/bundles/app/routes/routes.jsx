import React     from 'react';
import { Route } from 'react-router';

import App      from '../containers/AppContainer';
import Dummies  from '../containers/DummiesContainer';
import Login    from '../containers/LoginContainer';
import Logout   from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';


export default store => {

  const loginHooks = {
    store,
    onEnter: Login.WrappedComponent.checkAuth,
  };

  return (
    <Route name="app" component={App}>

      <Route name="dummies" path="/" component={Dummies} />

      <Route name="login"  path="/login"  component={Login} {...loginHooks} />
      <Route name="logout" path="/logout" component={Logout} />

      <Route name="not-found" path="*" component={NotFound} />

    </Route>
  );

};
