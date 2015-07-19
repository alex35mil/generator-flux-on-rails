import React              from 'react';
import { PropTypes }      from 'react';
import { Link }           from 'react-router';

import Loader             from 'app/libs/components/Loader/Loader';

import * as actionTypes   from '../../constants/DummyConstants';


export default class Dummy extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    if (newProps.dummy.type === actionTypes.DUMMY_LOAD_SUCCEED) {
      newProps.loader.done();
    }

  }


  _handleLogOut() {

    // TODO: Re-render and re-fetch everything on logout
    const { authAgent, authActions } = this.props;
    authAgent.logout(authActions.logout);

  }


  render() {

    const { dummy: { data, isLoading }, auth: { isLoggedIn } } = this.props;

    const dummyContent = (
      <div>
        {data} {isLoggedIn ? `You're logged in!` : `You're logged out :(`}
        <div id="auth">
          {isLoggedIn ? (
            <span onClick={::this._handleLogOut} className="auth-link">logout</span>
          ) : (
            <Link to="/login" className="auth-link">login</Link>
          )}
        </div>
      </div>
    );

    return (
        <section id="dummy">
          {isLoading ? <Loader /> : dummyContent}
        </section>
    );

  }

}
