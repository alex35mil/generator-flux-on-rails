import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import fetchData           from 'app/libs/decorators/fetchData';
import * as authActions    from '../actions/authActions';
import * as dummiesActions from '../actions/dummiesActions';
import Dummies             from '../components/Dummies/Dummies';


const stateMap = state => ({
  $authStore   : state.$authStore,
  $dummiesStore: state.$dummiesStore,
});

const actionsMap = dispatch => ({
  authActions   : bindActionCreators(authActions, dispatch),
  dummiesActions: bindActionCreators(dummiesActions, dispatch),
});


@fetchData(({ apiHost, auth, dispatch }) => (
  dispatch(dummiesActions.loadEntities({ apiHost, auth }))
))
@connect(stateMap, actionsMap)
export default class DummiesContainer extends React.Component {

  render() {
    return (
      <Dummies {...this.props} />
    );
  }

}
