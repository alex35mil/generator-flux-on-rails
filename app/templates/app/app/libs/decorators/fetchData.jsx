import React, { PropTypes } from 'react';


export default fetchData => DecoratedComponent => (

  class FetchDataDecorator extends React.Component {

    static fetchData = fetchData

    static DecoratedComponent = DecoratedComponent

    static propTypes = {
      authAgent: PropTypes.shape({
        getAuthHeaders: PropTypes.func,
      }),

      store: PropTypes.shape({
        dispatch: PropTypes.func,
      }),

      location       : PropTypes.object,
      params         : PropTypes.object,
      isInitialRender: PropTypes.bool,
    }


    componentDidMount() {
      if (this.props.isInitialRender) return;

      const { authAgent, location, params, store } = this.props;

      fetchData({
        location,
        params,
        auth    : authAgent.getAuthHeaders(),
        dispatch: store.dispatch,
      });
    }


    render() {
      return (
        <DecoratedComponent {...this.props} />
      );
    }

  }

);
