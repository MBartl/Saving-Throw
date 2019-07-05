import React, { Component, Fragment } from 'react';

import CampaignCard from '../../components/CampaignCard';
import Loader from '../../Loader';

import { url } from '../../route';
import { connect } from 'react-redux';


class MoreCampaigns extends Component {

  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.getState("More");
    const token = localStorage.getItem('token');

    fetch(url + 'discover-campaigns', {
      headers: {'Authorization': token}
    })
    .then(res => res.json())
    .then(doc => this.props.discoverCampaigns(doc.campaigns))
    .then(() => this.props.discoverLoad());
  };

  pageResults = () => {
    const discover = this.props.discover;
    const page = this.state.currentPage;
    const results = discover.slice((page-1)*4, (page-1)*4+4);

    return results;
  };

  pageInc = (inc) => {

    this.setState({
      currentPage: this.state.currentPage+inc
    });
  };

  render() {
    return (
      <div>
        { this.props.loading ?
          <Loader />
        :
        this.pageResults().length !== 0 && !this.props.loading ?
          <div>
            <span className='campaignPageCount' id='discoverPageCount'>
              Page: {this.state.currentPage} of {Math.ceil(this.props.discover.length/4)}
            </span>
            <h2>Discover Campaigns:</h2>
          </div>
        :
          null
        }
        {
          this.pageResults().length !== 0 ?
            this.pageResults().map((c, index) => <CampaignCard key={index} info={c} nav={this.props.nav} />)
          :
          null
        }
        {
          this.pageResults().length !== 0 && !this.props.loading ?
            <Fragment>
              <button
                disabled={this.state.currentPage === 1 ? true : false}
                className='discoverToggle' onClick={() => this.pageInc(-1)}>◀◀Prev</button>
              <button
                disabled={this.state.currentPage*4 >= this.props.discover.length ? true : false}
                className='discoverToggle' onClick={() => this.pageInc(1)}>Next▶▶</button>
            </Fragment>
          :
          this.props.loading ?
            null
          :
          <h2>No new campaigns to discover</h2>
        }
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    loading: state.load.discoverLoad,
    discover: state.campaign.discover
  };
};

const mapDispatchToProps = dispatch => {
  return {
    discoverLoad: () => {
      dispatch({ type: 'DISCOVER_LOADING' })
    },
    discoverCampaigns: (campaigns) => {
      dispatch({ type: 'SET_DISCOVER', payload: campaigns })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoreCampaigns);
