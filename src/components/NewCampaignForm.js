import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { url } from '../route';
import { connect } from 'react-redux';


class newCampaignForm extends Component {

  componentDidMount() {
    this.props.getState("New")
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    let name = e.target.name.value;
    let description = e.target.description.value;
    let max_players = e.target.max_players.value;
    let campaign = {campaign: {name, description, max_players}};

    fetch(url + 'campaigns', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(campaign)
    })
    .then(res => res.json())
    .then(campaign => {
      if (campaign.errors) {
        alert(campaign.errors)
      } else {
      this.props.addCampaign(campaign)
      this.props.history.push('/campaigns')
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Link to='campaigns'>
          <button onClick={() => this.props.getState("Home")} className='bodyBtn' id='campaignBack'>Back</button>
        </Link>
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
    addCampaign: (campaign) => {
      dispatch({ type: 'ADD_CAMPAIGN', payload: campaign })
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(newCampaignForm);
