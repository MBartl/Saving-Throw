import React, { Component } from 'react';

import { url } from '../route'

class CampaignsHome extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')

    fetch(url + 'campaigns', {
      headers: {
        'Authorization': token
      }
    })
  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default CampaignsHome;
