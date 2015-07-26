import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Layout                   from './Layout';

import * as AuthActions         from '../actions/AuthActions';


@connect(state => ({
  auth: state.auth
}))

export default class App extends React.Component {


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
      <Layout auth={auth} authActions={bindActionCreators(AuthActions, dispatch)} {...this.props} />
    );

  }


}
