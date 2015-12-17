import React from 'react';

import styles from './Footer.scss';


export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className={styles.inner}>
          <div className={styles.text}>
            <a href="https://facebook.github.io/react" target="_blank">
              React
            </a>
            &middot;
            <a href="https://github.com/gaearon/redux" target="_blank">
              Redux
            </a>
            &middot;
            <a href="http://rackt.github.io/react-router" target="_blank">
              React Router
            </a>
            &middot;
            <a href="http://expressjs.com" target="_blank">
              Express
            </a>
            &middot;
            <a href="https://nodejs.org" target="_blank">
              Node.js
            </a>
            &middot;
            <a href="http://rubyonrails.org" target="_blank">
              Ruby on Rails
            </a>
          </div>
        </div>
      </footer>
    );
  }

}
