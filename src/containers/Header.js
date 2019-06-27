import React, { Component } from 'react';
import AccountButtons from '../components/AccountButtons'

class Header extends Component {

  render() {
    return (
      <div id='header'>
        <h1>Saving Throw</h1>
        <AccountButtons />
      </div>
    );
  }

}

export default Header;
