import React  from 'react';

export default class Component extends React.Component {

  componentDidMount() {
    this.props.loaded();
    this.props.setTitle();
  }

  render() {
    return (
        <section id="component">{this.props.data.say}</section>
    );
  }

}
