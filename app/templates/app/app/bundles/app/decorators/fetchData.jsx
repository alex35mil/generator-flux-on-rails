import React          from 'react';
import { PropTypes }  from 'react';


export default (fetch) => {

  return DecoratedComponent => (


    class FetchDataDecorator extends React.Component {

      static fetchData = fetch


      componentDidMount() {

        if (this.props.initialRender) return;

        const { authAgent, location, params, store } = this.props;

        fetch({
          location,
          params,
          auth    : authAgent.getAuthHeaders(),
          dispatch: store.dispatch
        });

      }


      render() {

        return (
          <DecoratedComponent {...this.props} />
        );

      }

    }


  );

}
