import React, { Component, Fragment } from 'react';

import MainCampaign from './MainCampaign';
import MoreCampaigns from './MoreCampaigns';

import NewCampaignForm from '../../components/NewCampaignForm';

import Loader from '../../Loader';

import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';


class CampaignsHome extends Component {

  state = {
    nav: 'Home'
  };

  componentDidMount(){
    this.props.setCampaigns();
    this.props.setCharacters();
  };

  getState = (event) => {
    let state;

    if (event.target) {
      state = event.target.innerText
      this.changeState(state)
    }
    else {
      this.changeState(event)
    };
  };

  changeState = (state) => {
    this.setState({
      nav: state
    });
  };

  render() {
    return (
      <div>
        <Link to='/campaigns'>
          <button id='campaignHome' onClick={event => this.getState(event)}
            className={this.state.nav === 'Home' ? 'bodyBtn selected' :
            'bodyBtn'}>Home</button>
        </Link>
        <Link to='/more-campaigns'>
          <button onClick={event => this.getState(event)}
            className={this.state.nav === 'More' ? 'bodyBtn selected' :
            'bodyBtn'}>More</button>
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
          <Route path='/more-campaigns' render={(routerProps) => {
            return <MoreCampaigns {...routerProps} getState={this.getState} />
          }} />
          <Route path='/new-campaign' render={(routerProps) => {
            return <NewCampaignForm {...routerProps} getState={this.getState} />
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
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns
  };
};

export default connect(
  mapStateToProps
)(CampaignsHome);
