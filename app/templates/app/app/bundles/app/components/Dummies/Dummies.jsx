import React, { PropTypes } from 'react';
import Immutable            from 'immutable';
import { Link }             from 'react-router';
import classNames           from 'classnames';

import bindToContext from 'app/libs/bindToContext';
import Spinner       from 'app/libs/components/Spinner/Spinner';
import actionTypes   from 'app/bundles/app/constants/dummiesConstants';

import styles from './Dummies.scss';


export default class Dummies extends React.Component {

  static propTypes = {
    $authStore : PropTypes.instanceOf(Immutable.Map).isRequired,
    $dummiesStore: PropTypes.instanceOf(Immutable.Map).isRequired,

    authActions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,

    authAgent: PropTypes.shape({
      login : PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),

    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query   : PropTypes.object.isRequired,
    }).isRequired,

    history: PropTypes.shape({
      createPath: PropTypes.func.isRequired,
    }).isRequired,

    loadingProgress: PropTypes.object,
    setTitle       : PropTypes.func,
  }


  constructor(props, context) {
    super(props, context);

    bindToContext([
      '_handleLogout',
      '_renderLoggedInButton',
      '_renderLoggedOutButton',
      '_renderAuthSection',
      '_renderDummiesList',
    ], this);
  }


  componentDidMount() {
    const { loadingProgress, setTitle } = this.props;
    loadingProgress.done();
    setTitle.call(this);
  }


  componentWillReceiveProps(newProps) {
    const { $dummiesStore } = newProps;
    const action = $dummiesStore.get('action');

    if (action === actionTypes.DUMMY_LOAD_LIST_SUCCEED) {
      const { loadingProgress, setTitle } = newProps;
      loadingProgress.done();
      setTitle.call(this);
    }
  }


  _handleLogout() {
    const { authActions, authAgent, history } = this.props;
    const { pathname, query } = this.props.location;
    const nextLocation = history.createPath(pathname, query);

    authActions.logout({ authAgent, history, nextLocation });
  }


  _renderLoggedInButton() {
    return (
      <span onClick={this._handleLogout} className={styles.authButton}>
        logout
      </span>
    );
  }


  _renderLoggedOutButton() {
    return (
      <Link to="/login" className={styles.authButton}>
        login
      </Link>
    );
  }


  _renderAuthSection() {
    const { $authStore } = this.props;

    const isLoggedIn  = $authStore.get('isLoggedIn');
    const authMessage = isLoggedIn ? `You're logged in!` : `You're logged out`;
    const authImageClassNames = classNames({
      [styles.loggedIn] : isLoggedIn,
      [styles.loggedOut]: !isLoggedIn,
    });

    return (
      <div className={styles.content}>
        <div className={authImageClassNames} />
        <div className={styles.authMessage}>
          {authMessage}
        </div>
        <div className={styles.authButtonWrapper}>
        {
          isLoggedIn ?
          this._renderLoggedInButton() :
          this._renderLoggedOutButton()
        }
        </div>
      </div>
    );
  }


  _renderDummiesList() {
    const { $dummiesStore } = this.props;
    const isLoading = $dummiesStore.get('isLoading');

    const $dummies = (
      $dummiesStore
        .get('index')
        .map(dummyId => (
          $dummiesStore
            .get('entities')
            .get(`${dummyId}`)
        ))
    );

    return (
      <div className={styles.content}>
      {
        isLoading ?
        <Spinner /> :
        $dummies.map($dummy => (
          <div key={$dummy.get('id')} className={styles.dummyCard}>
            {$dummy.get('card')}
          </div>
        ))
      }
      </div>
    );
  }


  render() {
    return (
      <section id="dummies" className={styles.dummiesSection}>
        {this._renderAuthSection()}
        {this._renderDummiesList()}
      </section>
    );
  }

}
