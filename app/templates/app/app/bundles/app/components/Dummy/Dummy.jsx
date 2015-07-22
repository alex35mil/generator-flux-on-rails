import React              from 'react';
import { PropTypes }      from 'react';
import { Link }           from 'react-router';

import Loader             from 'app/libs/components/Loader/Loader';

import * as actionTypes   from '../../constants/DummyConstants';


export default class Dummy extends React.Component {


  static contextTypes = {
    router: PropTypes.object
  }


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


  _handleLogout() {

    const { authActions, authAgent } = this.props;
    const { router } = this.context;
    const { pathname, query } = router.state.location;

    const backPath = router.makePath(pathname, query);

    authActions.logout({ authAgent, router, backPath });

  }


  render() {

    const { dummy: { data, isLoading }, auth: { isLoggedIn } } = this.props;

    const dummyContent = (
      <div>
        {data} {isLoggedIn ? `You're logged in!` : `You're logged out :(`}
        <div id="auth">
          {isLoggedIn ? (
            <span onClick={::this._handleLogout} className="auth-link">logout</span>
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
