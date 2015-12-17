import React, { PropTypes } from 'react';


export default class Logout extends React.Component {

  static propTypes = {
    history: PropTypes.shape({
      pushState: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object.isRequired,
    }).isRequired,
  }


  componentDidMount() {
    const { history } = this.props;
    const { nextLocation } = this.props.location.state;

    history.pushState(null, nextLocation || '/');
  }


  render() {
    return null;
  }

}
