import React, { Component, Fragment } from 'react';

import { url } from '../route'
import { connect } from 'react-redux';

class CampaignsHome extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')

    fetch(url + 'campaigns', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(doc => {
      if (doc.campaigns) {
        this.props.setCampaign(doc.campaigns)
      }
      if (doc.characters) {
        this.props.setCharacterCampaigns(doc.characterCampaigns)
      }
    })
  }

  render() {
    return (
      <div>
        { this.props.campaigns.currentCampaigns.length !== 0 ?
          <Fragment>
            <h2>Campaigns you DM:</h2>
            <ul>
              {this.props.campaigns.forEach((campaign) => {
                return <li>{campaign.name}</li>
              })}
            </ul>
          </Fragment>
        :
          null
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns,
    characters: state.characters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCampaign: (campaigns) => {
      dispatch({ type: 'SET_CAMPAIGNS', payload: campaigns })
    },
    setCharacterCampaigns: (character) => {
      dispatch({ type: 'SET_CHARACTER_CAMPAIGNS', payload: character })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignsHome);
