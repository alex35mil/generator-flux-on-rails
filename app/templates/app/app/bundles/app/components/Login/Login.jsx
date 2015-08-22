import React                  from 'react';
import { PropTypes as Type }  from 'react';

import animate                from 'app/libs/animate';
import Loader                 from 'app/libs/components/Loader/Loader';

import * as actionTypes       from '../../constants/AuthConstants';


export default class Login extends React.Component {


  static propTypes = {

    auth: Type.shape({
      type     : Type.string,
      isLoading: Type.bool
    }).isRequired,

    authActions: Type.shape({
      login: Type.func.isRequired
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

    this.state = {
      login        : null,
      loginState   : null,
      password     : null,
      passwordState: null
    };

  }

  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    const { type } = newProps.auth;

    if (type === actionTypes.AUTH_LOGIN_FAILED) {
      this._handleFailedSubmit();
    }

  }


  _handleValueChange(e) {

    const { name, value } = e.target;

    this.setState({
      [name]: value.trim()
    }, this._validateForm.bind(this, null, name));

  }


  _validateForm(e, attr) {

    const rules = {
      login: {
        required: true
      },
      password: {
        required: true
      }
    };

    const isFail = 'error';
    const isOk   = 'ok';

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
            rules: rules[attribute]
          });
        }
      }
    } else {
      attributes.push({
        key  : attr,
        rules: rules[attr]
      });
    }

    attributes.forEach((attribute, index) => {

      const attrValue = this.state[attribute.key] ? this.state[attribute.key].trim() : this.state[attribute.key];
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

    const isFail = status === 'error';

    this.setState({ [attr + 'Status']: status });

    if (isFail) {
      this._formIsValid = false;
      if (!this._focusedOnError) {
        React.findDOMNode(this.refs[attr]).focus();
        this._focusedOnError = true;
      }
    }

  }


  _handleSuccessSubmit() {

    const { login, password } = this.state;
    const { authAgent, authActions } = this.props;
    const { router } = this.context;

    const data = {
      'api_user': {
        'email'   : login,
        'password': password
      }
    };

    authActions.login({ data, authAgent, router });

  }


  _handleFailedSubmit() {

    animate('login__form', 'shake');

  }


  render() {

    const { isLoading } = this.props.auth;

    return (
        <section id="login">
          <form id="login__form" onSubmit={::this._validateForm}>
            <input
                type="text"
                ref="login"
                name="login"
                placeholder="Email"
                value={this.state.login}
                className={this.state.loginStatus}
                onChange={::this._handleValueChange}
                autoFocus={true}
            />
            <input
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                className={this.state.passwordStatus}
                onChange={::this._handleValueChange}
            />
            <div className="button-wrapper">
              <button disabled={isLoading}>Login!</button>
              {isLoading && <Loader color="#fff" />}
            </div>
          </form>
        </section>
    );

  }


}
