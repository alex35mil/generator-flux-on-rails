import React          from 'react';
import { PropTypes }  from 'react';


export default class Logout extends React.Component {


  static contextTypes = {
    router: PropTypes.object
  }


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    const { router } = this.context;
    const { backPath } = this.props.location.state;

    router.transitionTo(backPath || '/');

  }


  render() {
    return null;
  }


}
