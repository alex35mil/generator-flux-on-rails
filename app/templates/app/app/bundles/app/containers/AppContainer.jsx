import React, { PropTypes }   from 'react';
import Immutable              from 'immutable';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Layout           from '../layouts/Layout';
import * as authActions from '../actions/authActions';


const stateMap = state => ({
  $authStore: state.$authStore,
});

const actionsMap = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});


@connect(stateMap, actionsMap)
export default class App extends React.Component {

  static propTypes = {
    $authStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  render() {
    return (
      <Layout {...this.props} />
    );
  }

}
