import React    from 'react';
import Router   from 'react-router';


const { Link } = Router;


// const HeaderProps = {
//   path           : Type.string,
//   isLoggedIn     : Type.bool,
//   updateAuthState: Type.func,
// };


export default class Header extends React.Component {

  render() {
    return (
        <header>
          <h1>
            <Link to="app">It's Isomorphic</Link>
          </h1>
        </header>
    );
  }

}
