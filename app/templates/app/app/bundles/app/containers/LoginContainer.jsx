import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Login            from '../components/Login/Login';
import * as authActions from '../actions/authActions';


const stateMap = state => ({
  $authStore: state.$authStore,
});

const actionsMap = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});


@connect(stateMap, actionsMap)
export default class LoginContainer extends React.Component {

  static checkAuth(nextState, replaceState) {
    const { $authStore } = this.store.getState();
    if ($authStore.get('isLoggedIn')) replaceState(null, '/');
  }

  render() {
    return (
      <Login {...this.props} />
    );
  }

}
