import React, { Component, Fragment } from 'react';

import { URL, HEADERS, CHANGE_NAV, ADD_CAMPAIGN, UPDATE_CHAT } from '../../constants'

import CampaignButtons from '../../components/CampaignButtons';

import { connect } from 'react-redux';


class newCampaignForm extends Component {

  componentDidMount() {
    this.props.setNav()
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    let name = e.target.name.value;
    let description = e.target.description.value;
    let max_players = e.target.max_players.value;
    let campaign = {campaign: {name, description, max_players}};

    fetch(URL + 'campaigns', {
      method: 'POST',
      headers: {...HEADERS,
        'Authorization': token
      },
      body: JSON.stringify(campaign)
    })
    .then(res => res.json())
    .then(campaign => {
      if (campaign.errors) {
        alert(campaign.errors);
      } else {
      this.props.addCampaign(campaign.campaign);
      this.props.updateChat(campaign.chat);
      this.props.history.push('/campaigns');
      }
    });
  };

  render() {
    return (
      <Fragment>
        <CampaignButtons />
        <form id='campaignForm' onSubmit={this.handleSubmit}>
          <label value='name'>Name</label>
          <input name='name' />
          <label value='description'>Max Players</label>
          <input type='number' name='max_players' min='1' max='50' />
          <label value='description'>Description</label>
          <textarea name='description' id='campaignDesc' />
          <button value='submit' id='campaignSubmit'>Submit</button>
        </form>
      </Fragment>
    );
  };

};

const mapDispatchToProps = dispatch => {
  return {
    setNav: () => {
      dispatch({ type: CHANGE_NAV, payload: 'New' })
    },
    addCampaign: (campaign) => {
      dispatch({ type: ADD_CAMPAIGN, payload: campaign })
    },
    updateChat: (chat) => {
      dispatch({ type: UPDATE_CHAT, payload: chat })
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(newCampaignForm);
