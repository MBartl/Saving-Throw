import React, { Component } from 'react';


class SideLoader extends Component {

  render() {
    return (
      <div id='sideLoadContainer'>
        <div id={this.props.id} className='sideLoader'></div>
      </div>
    );
  };

};

export default SideLoader;
