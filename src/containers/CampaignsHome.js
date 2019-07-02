import React, { Component, Fragment } from 'react';

import { url } from '../route'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Loader from '../components/Loader'

class CampaignsHome extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')

    if (this.props.campaigns.length === 0 &&
      this.props.characterCampaigns.length === 0) {

      this.props.campaignLoad()

      fetch(url + 'campaigns', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
          alert(doc.errors)
        } else
        if (doc.campaigns) {
          this.props.setCampaign(doc.campaigns)
        }
        if (doc.characterCampaigns) {
          this.props.setCharacterCampaigns(doc.characterCampaigns)
        }
      })
      .then(() => this.props.campaignLoad())
    }
    else {
      this.props.setCampaign(this.props.campaigns)
      this.props.setCharacterCampaigns(this.props.characterCampaigns)
    }
  }

  render() {
    return (
      <div>
        <Link to='/new-campaign'>
          <button id='campaignBtn'>Create New</button>
        </Link>
        {
          this.props.loadState ?
            <Loader />
          :
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
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.load.campaignLoading,
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns
  }
}

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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignsHome);
