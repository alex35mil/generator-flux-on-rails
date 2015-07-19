import React                    from 'react';
import { PropTypes }            from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Dummy                    from './Dummy';

import fetchData                from '../../decorators/fetchData';

import * as AuthActions         from '../../actions/AuthActions';
import * as DummyActions        from '../../actions/DummyActions';


@fetchData(({ apiHost, auth, dispatch }) => {
  return dispatch(DummyActions.loadDummy({ apiHost, auth }));
})

@connect(state => ({
  auth : state.auth,
  dummy: state.dummy
}))

export default class DummyContainer extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { auth, dummy, dispatch } = this.props;

    return (
      <Dummy
          auth={auth}
          authActions={bindActionCreators(AuthActions, dispatch)}
          dummy={dummy}
          dummyActions={bindActionCreators(DummyActions, dispatch)}
          {...this.props}
      />
    );

  }

}
