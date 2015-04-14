import React      from 'react';
import Router     from 'react-router';

import App        from './layout/layout';
import Component  from './components/Component/Component';

const { Route, DefaultRoute } = Router;


export default (

  <Route name="app" path="/" handler={App}>

    <Route name="component"  path="/component"  handler={Component}  />
    <DefaultRoute                               handler={Component}  />

  </Route>

);
