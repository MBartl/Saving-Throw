import React, { Component, Fragment } from 'react';


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
        <span className='dmAlert'>{this.props.info.dmNeeded ? 'DM Needed!' : null}</span>
        <p className='campaignDesc'>"{campaign.description.slice(0, 190)}
          {campaign.description.length > 190 ? '...' : null}"</p>
        {
          this.props.nav === 'More' ?
            <Fragment>
              { this.props.info.dmNeeded ?
                <button className='offerToDM'>DM</button>
              :
                null
              }
              <br />
              <button className='joinCampaignBtn'>Join</button>
            </Fragment>

          : null
        }
      </div>
    );
  };

};

export default CampaignCard;
