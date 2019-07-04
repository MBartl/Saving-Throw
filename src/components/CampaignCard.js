import React, { Component } from 'react';


class CampaignCard extends Component {

  render() {
    return (
      <div className='campaignCard'>{this.props.campaign.name}</div>
    );
  };

};

export default CampaignCard;
