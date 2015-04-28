import React    from 'react';

import request  from '../../../api/request';
import animate  from '../../../shared/js/helpers/animate';


// const LoginProps = {
//   path           : Type.string,
//   apiPath        : Type.string,
//   params         : Type.object,
//   loaded         : Type.func,
//   loading        : Type.func,
//   setTitle       : Type.func,
//   isLoggedIn     : Type.bool,
//   updateAuthState: Type.func,
//   auth           : Type.shape(
//     {
//       login         : Type.func,
//       logout        : Type.func,
//       getLogin      : Type.func,
//       getToken      : Type.func,
//       isLoggedIn    : Type.func,
//       getAuthHeaders: Type.func
//     }
//   )
// };


export default class Login extends React.Component {

  static willTransitionTo(transition, params, query) {
    // need a `transition.context` to access to auth methods
    // https://github.com/rackt/react-router/pull/590
    if (false /* `transition.context.isLoggedIn` */) {
      transition.redirect('/', params, query);
    }
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleFailedSubmit = this._handleFailedSubmit.bind(this);
  }

  componentDidMount() {
    // FIX: should be in `willTransitionTo` hook
    if (this.props.auth.isLoggedIn()) {
      this.context.router.transitionTo('/');
    }
    this.props.setTitle();
    this.props.loaded();
  }

  _handleSubmit(e) {

    e.preventDefault();

    let email    = React.findDOMNode(this.refs.email).value.trim(),
        password = React.findDOMNode(this.refs.password).value.trim();

    if (!email) {
      this._handleFailedSubmit('email');
      return;
    }

    if (!password) {
      this._handleFailedSubmit('password');
      return;
    }

    this.setState({ isLoading: true });

    let data = {
      api_user: { email, password }
    };

    request({
      method: 'post',
      path  : this.props.apiPath,
      data  : data,
      cb    : (err, res) => {

        if (res.status === 201 && res.body.user.authentication_token) {
          let { router } = this.context;
          let user = res.body.user;
          this.props.auth.login(user.email, user.authentication_token, {
            sessionOnly: false,
            cb: () => {
              this.props.updateAuthState(() => {
                if (!router.goBack()) {
                  router.transitionTo('/');
                }
              });
            }
          });
        } else {
          if (err.status === 401) {
            this._handleFailedSubmit();
            console.log('Login failed');
          } else {
            console.log(`${err.status}: ${err.message}`);
          }
        }

        this.setState({ isLoading: false });

      }
    });

  }

  _handleFailedSubmit(failed) {

    let el    = React.findDOMNode(this.refs.form);
    let field = React.findDOMNode(this.refs[failed]);

    animate(el, 'shake', () => { if (field) field.focus(); });

  }

  render() {
    return (
        <section id="login">
          <form ref="form" id="new_session" onSubmit={this._handleSubmit} action={this.props.apiPath} method="post" acceptСharset="UTF-8">
            <input ref="email" type="text" name="api_user[email]" id="api_user_email" placeholder="Email" autoFocus />
            <input ref="password" type="password" name="api_user[password]" id="api_user_password" placeholder="Password" />
            <div className="submit-wrapper">
              <input ref="button" type="submit" name="commit" value="Login!" disabled={this.state.isLoading} />
              { this.state.isLoading ? <div className="loader-wrapper"><div className="loader" /></div> : null }
            </div>
          </form>
        </section>
    );
  }

}

Login.contextTypes = {
  router: React.PropTypes.func
};
