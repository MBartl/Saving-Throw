import React, { Component } from 'react';

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
    .then(this.props.discoverLoad());
  };

  pageResults = () => {
    const discover = this.props.discover;
    const page = this.state.currentPage;
    const results = (page-1)*5;

    return discover.slice(results, results+5);
  };

  pageInc = (inc) => {

    this.setState({
      currentPage: this.state.currentPage+inc
    });
  };

  render() {
    return (
      <div>
        { this.state.loading ?
          <Loader />
        :
        this.pageResults() !== [] ?
          this.pageResults().map((c, index) => <CampaignCard key={index} campaign={c} />)
        : null
        }
        <button
          disabled={this.state.currentPage === 1 ? true : false}
          className='discoverToggle' onClick={() => this.pageInc(-1)}>◀◀Prev</button>
        <button
          disabled={this.state.currentPage*5 >= this.props.discover.length ? true : false}
          className='discoverToggle' onClick={() => this.pageInc(1)}>Next▶▶</button>
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
