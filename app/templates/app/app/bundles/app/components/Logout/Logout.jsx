import React                    from 'react';
import { PropTypes as Type }    from 'react';


export default class Logout extends React.Component {


  static propTypes = {
    location: Type.shape({
      state: Type.object.isRequired
    }).isRequired
  }


  static contextTypes = {
    router: Type.object.isRequired
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
