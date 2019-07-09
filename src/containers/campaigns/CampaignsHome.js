import React, { Component, Fragment } from 'react';

import { URL, CHANGE_NAV, DISCOVER_LOADING, SET_DISCOVER } from '../../constants'

import MainCampaign from './MainCampaign';
import MoreCampaigns from './MoreCampaigns';
import CampaignShow from './CampaignShow';
import NewCampaignForm from './NewCampaignForm';

import Loader from '../../Loader';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


class CampaignsHome extends Component {

  componentDidMount(){
    this.props.setCampaigns();

    this.props.match.url.split('-')[0] === '/campaigns' ?
      this.props.setNav('Home')
      :
      this.props.match.url.split('-')[0] === '/more' ?
        this.props.setNav('More')
        :
        this.props.setNav('New')

    const token = localStorage.getItem('token');

    fetch(URL + 'discover-campaigns', {
      headers: {'Authorization': token}
    })
    .then(res => res.json())
    .then(doc => this.props.discoverCampaigns(doc.campaigns))
    .then(() => this.props.discoverLoad());
  };

  render() {
    return (
      <div id='campaignsHome'>
        { this.props.loadState ?
          <Loader />

        :
        <Fragment>
          <Route exact path='/campaigns' render={(routerProps) => {
            return <MainCampaign {...routerProps} />
          }} />
          <Route path='/campaigns/:id' render={(routerProps) => {
            return <CampaignShow {...routerProps} />
          }} />
          <Route exact path='/more-campaigns' render={(routerProps) => {
            return <MoreCampaigns {...routerProps} />
          }} />
          <Route path='/more-campaigns/:id' render={(routerProps) => {
            return <CampaignShow {...routerProps} />
          }} />
          <Route path='/new-campaign' render={(routerProps) => {
            return <NewCampaignForm {...routerProps} />
          }} />
        </Fragment>
        }
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    loadState: state.load.campaignLoading,
    // campaigns: state.campaign.campaigns,
    // discover: state.campaign.discover,
    characterCampaigns: state.campaign.characterCampaigns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNav: (keyword) => {
      dispatch({ type: CHANGE_NAV, payload: keyword })
    },
    discoverLoad: () => {
      dispatch({ type: DISCOVER_LOADING })
    },
    discoverCampaigns: (campaigns) => {
      dispatch({ type: SET_DISCOVER, payload: campaigns })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignsHome);
