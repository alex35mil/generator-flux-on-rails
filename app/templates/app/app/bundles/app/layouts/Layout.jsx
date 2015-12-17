import React, { PropTypes } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './Layout.scss';


export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  }


  render() {
    return (
      <section id="layout">
        <Header />
        {this.props.children}
        <Footer />
      </section>
    );
  }

}
