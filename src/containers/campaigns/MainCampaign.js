import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';


class MainCampaign extends Component {

  render() {
    return (
      <Fragment>
        {
          this.props.campaigns.length !== 0 ?
            <Fragment>
              <h2>Campaigns you DM:</h2>
              <ul>
                {this.props.campaigns.map((campaign, index) => {
                  return <li key={index}>{campaign.name}</li>
                })}
              </ul>
            </Fragment>
          :
          null
        }
        {
          this.props.loadState ?
            null
          :
          this.props.characterCampaigns.length !== 0 ?
            <Fragment>
              <h2>Your Character's Campaigns:</h2>
              <ul>
                {this.props.characterCampaigns.map((campaign, index) => {
                  return <li key={index}>{campaign.name}</li>
                })}
              </ul>
            </Fragment>
          :
          null
        }
        {
          !this.props.campaigns && !this.props.characterCampaigns && !this.props.loadState ?
            <h2>You don't have any campaigns yet</h2>
          :
          null
        }
      </Fragment>
    );
  };

};

const mapStateToProps = state => {
  return {
    loadState: state.load.campaignLoading,
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    campaignLoad: () => {
      dispatch({ type: 'CAMPAIGN_LOADING' })
    },
    setCampaign: (campaigns) => {
      dispatch({ type: 'SET_CAMPAIGNS', payload: campaigns })
    },
    setCharacterCampaigns: (characterCampaigns) => {
      dispatch({ type: 'SET_CHARACTER_CAMPAIGNS', payload: characterCampaigns })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainCampaign);
