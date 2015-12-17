import React    from 'react';
import { Link } from 'react-router';

import './Header.scss';


export default class Header extends React.Component {

  render() {
    return (
      <header>
        <h1>
          <Link to="/">Isomorphic Flux</Link>
        </h1>
      </header>
    );
  }

}
