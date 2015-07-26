import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Login                    from './Login';

import * as AuthActions         from '../../actions/AuthActions';


@connect(state => ({
  auth: state.auth
}))

export default class LoginContainer extends React.Component {


  static checkAuth(nextState, transition) {

    const { auth } = this.context.store.getState();
    if (auth.isLoggedIn) transition.to('/');

  }


  static propTypes = {
    auth    : Type.object.isRequired,
    dispatch: Type.func.isRequired
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { auth, dispatch } = this.props;

    return (
      <Login
          auth={auth}
          authActions={bindActionCreators(AuthActions, dispatch)}
          {...this.props}
      />
    );

  }

}
