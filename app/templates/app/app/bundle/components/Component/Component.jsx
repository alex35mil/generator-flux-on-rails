import React    from 'react';
import Router   from 'react-router';


const { Link } = Router;


// const CommentsProps = {
//   path           : Type.string,
//   apiPath        : Type.string,
//   params         : Type.object,
//   loaded         : Type.func,
//   loading        : Type.func,
//   setTitle       : Type.func,
//   isLoggedIn     : Type.bool,
//   updateAuthState: Type.func,
//   data           : Type.shape(
//     {
//       say: Type.string
//     }
//   ),
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


export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this._handleLogOut = this._handleLogOut.bind(this);
  }

  componentDidMount() {
    this.props.loaded();
    this.props.setTitle();
  }

  _handleLogOut() {
    this.props.auth.logout(() => this.props.updateAuthState());
  }

  render() {

    let authLink;

    if (this.props.isLoggedIn) {
      authLink = <span onClick={this._handleLogOut} className="auth-link">logout</span>;
    } else {
      authLink = <Link to="login" className="auth-link">login</Link>;
    }

    return (
        <section id="component">
          {this.props.data.say} {this.props.isLoggedIn ? "You're logged in!" : "You're logged out :("} {authLink}
        </section>
    );
  }

}
