import React      from 'react';
import { Link }   from 'react-router';


export default class Header extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


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
