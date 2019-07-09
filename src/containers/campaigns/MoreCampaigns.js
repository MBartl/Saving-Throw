import React, { Component, Fragment } from 'react';

import CampaignCard from '../../components/CampaignCard';
import CampaignButtons from '../../components/CampaignButtons';
import Loader from '../../Loader';

import { connect } from 'react-redux';


class MoreCampaigns extends Component {

  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.setNav();
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
      <div id='discoverCampaigns'>
        <CampaignButtons />
        <br />
        { this.props.loading ?
          <Loader />
        :
        this.pageResults().length !== 0 && !this.props.loading ?
          <div>
            <h2 className='discoverHeader'>Discover Campaigns:</h2>
            <span className='campaignPageCount' id='discoverPageCount'>
              Page: {this.state.currentPage} of {Math.ceil(this.props.discover.length/4)}
            </span>
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
    setNav: () => {
      dispatch({ type: 'CHANGE_NAV', payload: 'More' })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoreCampaigns);
