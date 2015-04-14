import React    from 'react';
import Router   from 'react-router';

import Header   from '../components/Header/Header';
import Footer   from '../components/Footer/Footer';

const { RouteHandler } = Router;


export default class App extends React.Component {

  render() {
    return (
        <section id="layout">
          <Header />
          <RouteHandler {...this.props} />
          <Footer />
        </section>
    );
  }

}
