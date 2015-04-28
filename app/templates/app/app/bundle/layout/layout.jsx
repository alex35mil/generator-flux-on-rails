import React    from 'react';
import Router   from 'react-router';

import Header   from '../components/Header/Header';
import Footer   from '../components/Footer/Footer';

const { RouteHandler } = Router;


// const AppProps = {
//   path    : Type.string,
//   apiPath : Type.string,
//   params  : Type.object,
//   loaded  : Type.func,
//   loading : Type.func,
//   setTitle: Type.func,
//   data    : Type.object,
//   auth    : Type.shape(
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


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: this.props.auth.isLoggedIn() };
    this._updateAuthState = this._updateAuthState.bind(this);
  }

  _updateAuthState(cb) {
    this.props.loading();
    this.setState({ isLoggedIn: this.props.auth.isLoggedIn() }, () => {
      this.props.loaded();
      if (cb) cb();
    });
  }

  render() {
    return (
        <section id="layout">
          <Header path={this.props.path} isLoggedIn={this.state.isLoggedIn} updateAuthState={this._updateAuthState} />
          <RouteHandler isLoggedIn={this.state.isLoggedIn} updateAuthState={this._updateAuthState} {...this.props} />
          <Footer />
        </section>
    );
  }

}
