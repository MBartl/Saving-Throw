import React, { Component } from 'react';


class Loader extends Component {

  render() {
    return (
      <div id={this.props.id} className='loader'></div>
    );
  };

};

export default Loader;
