import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class CampaignButtons extends Component {

  getNav = (event) => {
    const nav = event.target.innerText;
    this.props.setNav(nav);
  };

  render() {
    return (
      <div id='campaignButtons'>
        <Link to='/campaigns'>
          <button id='campaignHome' onClick={event => this.getNav(event)}
            className={this.props.nav === 'Home' ? 'bodyBtn selected' :
            'bodyBtn'}>Home</button>
        </Link>
        <Link to='/more-campaigns'>
          <button onClick={event => this.getNav(event)}
            className={this.props.nav === 'More' ? 'bodyBtn selected' :
            'bodyBtn'}>More</button>
        </Link>
        <Link to='/new-campaign'>
          <button onClick={event => this.getNav(event)}
            className={this.props.nav === 'New' ? 'bodyBtn selected' :
            'bodyBtn'}>New</button>
        </Link>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    nav: state.campaign.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNav: (nav) => {
      dispatch({ type: 'CHANGE_NAV', payload: nav })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignButtons);
