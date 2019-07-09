import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class CampaignCard extends Component {

  render() {
    const campaign = this.props.info.campaign
    const characters = this.props.info.characters
    return (
      <Link to={this.props.nav === 'Home' ? `campaigns/${campaign.id}` : `more-campaigns/${campaign.id}`}>
        <div className='campaignCard'>
          <span className='campaignPlayers'>
            {characters.length}/{campaign.max_players} characters
          </span>
          <span className='dmAlert'>{this.props.info.dmNeeded ? 'DM Needed!' : null}</span>
          <h3 className='campaignCardHeader'>{campaign.name}</h3><br />
          <p className='campaignDesc'>"{campaign.description.slice(0, 190)}
            {campaign.description.length > 220 ? '...' : null}"</p>
          {
            this.props.nav === 'More' ?
              <Fragment>
                <button className='campaignInfoBtn'>Info</button>
              </Fragment>

            : null
          }
        </div>
      </Link>
    );
  };

};

const mapStateToProps = state => {
  return {
    nav: state.campaign.nav
  };
};

export default connect(
  mapStateToProps
)(CampaignCard);
