import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div id='footer'>
        <span style={{float: 'left'}}>
          Character portraits by <a className='footerLink' href='http://team-preston.com' target='_blank' rel='noopener noreferrer'>
          Jeff Preston</a>
          <br/>
          via <a className='footerLink' href='http://kck.st/dogX5W' target='_blank' rel='noopener noreferrer'>
          Terrible Character Portraits</a>
        </span>
        <span style={{float: 'right'}}>
          <a className='footerLink' href='https://github.com/MBartl/Saving-Throw' target='_blank'
          rel='noopener noreferrer'>Open source</a> project by <a className='footerLink' href='https://github.com/MBartl' target='_blank' rel='noopener noreferrer'> Matt Bartl</a>
        </span>
        <br />
        <span style={{float: 'right'}}>
          Made with <span role='img' aria-label='love'>❤️</span>at Flatiron School
        </span>
      </div>
    );
  }

}

export default Footer;
