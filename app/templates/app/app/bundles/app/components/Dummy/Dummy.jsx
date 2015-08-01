import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { Link }                 from 'react-router';

import Loader                   from 'app/libs/components/Loader/Loader';

import * as actionTypes         from '../../constants/DummyConstants';


export default class Dummy extends React.Component {


  static propTypes = {

    auth: Type.shape({
      isLoggedIn: Type.bool
    }).isRequired,

    authActions: Type.shape({
      logout: Type.func.isRequired
    }).isRequired,

    dummy: Type.shape({
      type     : Type.string,
      data     : Type.string,
      isLoading: Type.bool
    }).isRequired,

    authAgent: Type.shape({
      login : Type.func.isRequired,
      logout: Type.func.isRequired
    }),

    loader  : Type.object,
    setTitle: Type.func

  }


  static contextTypes = {
    router: Type.object.isRequired
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
      this.props.setTitle();
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
      <div id="dummy__content">
        {data} {isLoggedIn ? `You're logged in!` : `You're logged out :(`}
        <div id="dummy__content__auth">
          {isLoggedIn ? (
            <span onClick={::this._handleLogout} className="dummy__content__auth__link">logout</span>
          ) : (
            <Link to="/login" className="dummy__content__auth__link">login</Link>
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
