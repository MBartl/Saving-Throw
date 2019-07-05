import React, { Component } from 'react';


class CampaignCard extends Component {

  render() {
    const campaign = this.props.info.campaign
    const characters = this.props.info.characters
    return (
      <div className='campaignCard'>
        <span className='campaignPlayers'>
          {characters.length}/{campaign.max_players} characters
        </span>
        <h3 className='campaignHeader'>{campaign.name}</h3>
        <p className='campaignDesc'>"{campaign.description.slice(0, 190)}
          {campaign.description.length > 190 ? '...' : null}"</p>
        <button className='joinCampaignBtn'>Join</button>
      </div>
    );
  };

};

export default CampaignCard;
