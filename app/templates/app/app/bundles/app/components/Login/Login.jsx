import React, { PropTypes } from 'react';
import Immutable            from 'immutable';

import bindToContext from 'app/libs/bindToContext';
import animate       from 'app/libs/animate';
import Button        from 'app/libs/components/Button/Button';
import actionTypes   from '../../constants/authConstants';

import styles from './Login.scss';


// TODO: This form is copy/paste from old non-redux project.
//       Rewrite it for redux.
export default class Login extends React.Component {

  static propTypes = {
    $authStore: PropTypes.instanceOf(Immutable.Map).isRequired,

    authActions: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,

    authAgent: PropTypes.shape({
      login : PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),

    history        : PropTypes.object.isRequired,
    loadingProgress: PropTypes.object.isRequired,
    setTitle       : PropTypes.func.isRequired,
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      login        : null,
      loginState   : null,
      password     : null,
      passwordState: null,
    };

    bindToContext([
      '_handleValueChange',
      '_validateForm',
      '_setFormState',
      '_handleSuccessSubmit',
      '_handleFailedSubmit',
    ], this);
  }


  componentDidMount() {
    const { loadingProgress, setTitle } = this.props;
    loadingProgress.done();
    setTitle.call(this);
  }


  componentWillReceiveProps(newProps) {
    const { $authStore } = newProps;
    const action = $authStore.get('action');

    if (action === actionTypes.AUTH_LOGIN_FAILED) {
      this._handleFailedSubmit();
    }
  }


  _handleValueChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value.trim(),
    }, this._validateForm.bind(this, null, name));
  }


  _validateForm(e, attr) {
    const rules = {
      login: {
        required: true,
      },
      password: {
        required: true,
      },
    };

    const isFail = styles.error;
    const isOk   = styles.ok;

    const isSubmit = e ? e.target.nodeName === 'FORM' : false;

    this._formIsValid    = true;
    this._focusedOnError = false;
    this._wasSubmitted   = false;

    if (isSubmit && !this._wasSubmitted) this._wasSubmitted = true;

    const attributes = [];

    if (isSubmit) {
      e.preventDefault();
      for (const attribute in rules) {
        if (rules.hasOwnProperty(attribute)) {
          attributes.push({
            key  : attribute,
            rules: rules[attribute],
          });
        }
      }
    } else {
      attributes.push({
        key  : attr,
        rules: rules[attr],
      });
    }

    attributes.forEach((attribute, index) => {
      const attrValue = (
        this.state[attribute.key] ?
        this.state[attribute.key].trim() :
        this.state[attribute.key]
      );
      const attrRules = attribute.rules;

      if (attrRules.required && !attrValue) {
        this._setFormState(attribute.key, isFail);
        return;
      }

      this._setFormState(attribute.key, isOk);

      if (isSubmit && this._formIsValid && index === attributes.length - 1) {
        this._handleSuccessSubmit();
      }
    });

    if (isSubmit && !this._formIsValid) {
      this._handleFailedSubmit();
    }
  }


  _setFormState(attr, status) {
    const isFail = status === styles.error;

    this.setState({ [attr + 'Status']: status });

    if (isFail) {
      this._formIsValid = false;
      if (!this._focusedOnError) {
        this.refs[attr].focus();
        this._focusedOnError = true;
      }
    }
  }


  _handleSuccessSubmit() {
    const { login, password } = this.state;
    const { authAgent, authActions, history } = this.props;

    const authData = {
      'api_user': {
        'email'   : login,
        'password': password,
      },
    };

    authActions.login({ authData, authAgent, history });
  }


  _handleFailedSubmit() {
    animate('login-form', 'shake');
  }


  render() {
    const { $authStore } = this.props;
    const isLoading = $authStore.get('isLoading');

    return (
      <section className={styles.loginSection}>
        <form id="login-form" onSubmit={this._validateForm}>
          <input
            type="text"
            ref="login"
            name="login"
            placeholder="Email"
            value={this.state.login}
            className={this.state.loginStatus}
            onChange={this._handleValueChange}
            autoFocus={true}
          />
          <input
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            className={this.state.passwordStatus}
            onChange={this._handleValueChange}
          />
          <Button
            wrapperClassName={styles.buttonWrapper}
            spinnerSize="20"
            spinnerColor="#fff"
            isProcessing={isLoading}
          >
            Login!
          </Button>
        </form>
      </section>
    );
  }

}
