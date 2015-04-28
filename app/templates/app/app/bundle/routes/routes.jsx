import React      from 'react';
import Router     from 'react-router';

import App        from '../layout/layout';
import Component  from '../components/Component/Component';
import Login      from '../components/Auth/Login';

const { Route, DefaultRoute } = Router;


export default (

  <Route name="app" path="/" handler={App}>

    <Route name="component"  path="/component"  handler={Component}  />
    <Route name="login"      path="/login"      handler={Login}      />

    <DefaultRoute                               handler={Component}  />

  </Route>

);
