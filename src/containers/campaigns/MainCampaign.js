import React, { Component, Fragment } from 'react';

import { CAMPAIGN_LOADING, SET_CAMPAIGNS, SET_CHARACTER_CAMPAIGNS } from '../../constants'

import CampaignCard from '../../components/CampaignCard';
import CampaignButtons from '../../components/CampaignButtons';

import { connect } from 'react-redux';


class MainCampaign extends Component {

  state = {
    currentPage: 1
  };

  pageResults = () => {
    const allCampaigns = this.combinedCampaigns();

    const page = this.state.currentPage;
    const results = allCampaigns.slice((page-1)*4, (page-1)*4+4);

    return {campaigns: results.filter(c => this.props.campaigns.includes(c)), characterCampaigns: results.filter(c => this.props.characterCampaigns.includes(c))};
  };

  combinedCampaigns = () => {
    return [...this.props.campaigns, ...this.props.characterCampaigns]
  }

  pageInc = (inc) => {

    this.setState({
      currentPage: this.state.currentPage+inc
    });
  };

  render() {
    return (
      <div id='mainCampaign'>
        <CampaignButtons />
        <br />
        {
          this.pageResults().campaigns.length ?
            <Fragment>
              <h2 className='campaignHeader'>Campaigns you DM:</h2>
              <span className='campaignPageCount'>
                Page: {this.state.currentPage} of {Math.ceil(this.combinedCampaigns().length/4)}
              </span>
              {this.pageResults().campaigns.map((campaign, index) => {
                return <CampaignCard key={index} info={campaign} nav={this.props.nav} />
              })}
            </Fragment>
          :
          null
        }
        {
          this.props.loadState ?
            null
          :
          this.pageResults().characterCampaigns.length !== 0 ?
            <h2 className='campaignHeader'>Your Character's Campaigns:</h2>
          :
          null
        }
        {
          this.pageResults().campaigns.length === 0 && this.pageResults().characterCampaigns.length !== 0 ?
            <span className='campaignPageCount'>
              Page: {this.state.currentPage} of {Math.ceil(this.combinedCampaigns().length/4)}
            </span>
          :
            null
        }
        {
          this.pageResults().characterCampaigns.length !== 0 ?
            this.pageResults().characterCampaigns.map((campaign, index) => {
              return <CampaignCard key={index} info={campaign} nav={this.props.nav} />
            })
          :
          null
        }
        {
          this.props.campaigns.length + this.props.characterCampaigns.length > 4 ?
            <Fragment>
              <button
                disabled={this.state.currentPage === 1 ? true : false}
                className='discoverToggle' onClick={() => this.pageInc(-1)}>◀◀Prev</button>
              <button
                disabled={this.state.currentPage*4 >= this.props.campaigns.length + this.props.characterCampaigns.length ? true : false}
                className='discoverToggle' onClick={() => this.pageInc(1)}>Next▶▶</button>
            </Fragment>
          :
          null
        }
        {
          !this.props.campaigns.length && !this.props.characterCampaigns.length && !this.props.loadState ?
            <h2>You don't have any campaigns yet</h2>
          :
          null
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

const mapDispatchToProps = dispatch => {
  return {
    campaignLoad: () => {
      dispatch({ type: CAMPAIGN_LOADING })
    },
    setCampaign: (campaigns) => {
      dispatch({ type: SET_CAMPAIGNS, payload: campaigns })
    },
    setCharacterCampaigns: (characterCampaigns) => {
      dispatch({ type: SET_CHARACTER_CAMPAIGNS, payload: characterCampaigns })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainCampaign);
