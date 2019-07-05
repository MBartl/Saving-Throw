import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div id='footer'>
        <span style={{float: 'left'}}>
          Character portraits by
          <a href='http://team-preston.com' target='_blank'>Jeff Preston</a>
          <br/>
          via <a href='http://kck.st/dogX5W' target='_blank'>Terrible Character Portraits</a>
        </span>
        <span style={{float: 'right'}}>
          <a href='https://github.com/MBartl/Saving-Throw' target='_blank'>Open source</a> project by <a href='https://github.com/MBartl' target='_blank'>Matt Bartl</a>
        </span>
        <br />
        <span style={{float: 'right'}}>
          Made with <span role='img' aria-label='love'>❤️</span>at <span style={{color: 'lightblue'}}><span style={{display: 'none'}}>'</span>//<span style={{display: 'none'}}>'</span></span> Flatiron School
        </span>
      </div>
    );
  }

}

export default Footer;
