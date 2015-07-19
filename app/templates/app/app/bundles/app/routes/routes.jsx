import React      from 'react';
import { Route }  from 'react-router';

import App        from '../layouts/App';
import Dummy      from '../components/Dummy/DummyContainer';
import Login      from '../components/Login/LoginContainer';
import NotFound   from '../components/NotFound/NotFound';


export default (context) => (

  <Route name="app" component={App}>

    <Route name="dummy"       path="/"        component={Dummy} />

    <Route name="login"       path="/login"   component={Login}   context={context}   onEnter={Login.DecoratedComponent.checkAuth} />

    <Route name="not-found"   path="*"        component={NotFound} />

  </Route>

);
