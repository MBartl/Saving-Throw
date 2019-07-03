import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { url } from '../route'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import MainCampaign from '../components/MainCampaign'
import NewCampaignForm from '../components/NewCampaignForm';
import Loader from '../components/Loader'

class CampaignsHome extends Component {

  state = {
    nav: 'Home'
  }

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

  getState = (event) => {
    let state

    if (event.target) {
      state = event.target.innerText
      this.changeState(state)
    }
    else {
      this.changeState(event)
    }
  }

  changeState = (state) => {
    this.setState({
      nav: state
    })
  }

  render() {
    return (
      <div>
        <Link to='/campaigns'>
          <button id='campaignHome' onClick={event => this.getState(event)}
            className={this.state.nav === 'Home' ? 'bodyBtn selected' :
            'bodyBtn'}>Home</button>
        </Link>
        <Link to='/all-campaigns'>
          <button className='bodyBtn'>All</button>
        </Link>
        <Link to='/new-campaign'>
          <button onClick={event => this.getState(event)}
            className={this.state.nav === 'New' ? 'bodyBtn selected' :
            'bodyBtn'}>New</button>
        </Link>
        { this.props.loadState ?
          <Loader />

        :
        <Fragment>
          <Route path='/campaigns' render={(routerProps) => {
            return <MainCampaign {...routerProps} />
          }} />
          <Route path='/new-campaign' render={(routerProps) => {
            return <NewCampaignForm {...routerProps} getState={this.getState} />
          }} />
        </Fragment>
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
