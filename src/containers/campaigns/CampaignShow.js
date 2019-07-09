import React, { Component, Fragment } from 'react';

import CharacterCard from '../../components/CharacterCard';
import Popup from 'reactjs-popup';

import { url } from '../../route';
import { connect } from 'react-redux';


class CampaignShow extends Component {

  state = {
    currentPage: 1
  };

  findMatch = () => {
    return [...this.props.campaigns, ...this.props.characterCampaigns, ...this.props.discover].find(c => c.campaign.id === parseInt(this.props.match.params.id));
  };

  pageResults = () => {
    if (typeof this.findMatch() !== 'undefined') {
      const characters = this.findMatch().characters;
      const page = this.state.currentPage;
      const results = characters.slice((page-1)*7, (page-1)*7+7);

      return results;
    };
  };

  pageInc = (inc) => {
    this.setState({
      currentPage: this.state.currentPage+inc
    });
  };

  joinCampaign = (campaign, character) => {
    const token = localStorage.getItem('token');

    const campaign_id = campaign.id;
    const character_id = character.id;

    fetch(url + 'join-campaign', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( {campaign: {campaign_id, character_id}} )
    })
    .then(res => res.json())
    .then(doc => {
        if (doc.errors) {
        alert(doc.errors)
      } else {
        this.props.updateCampaign(doc.campaign);
        debugger
        this.props.setFreeCharacters(this.props.freeCharacters.filter(c => c.id !== doc.character_id));
      }
    });
  };

  render() {
    let campaign;
    let characters;
    if (typeof this.pageResults() !== 'undefined') {
      campaign = this.findMatch().campaign;
      characters = this.pageResults();
    };
    return (
      <div id='campaignShow'>
        {
          typeof this.pageResults() !== 'undefined' ?
            <h3 className='campaignCharCount'>
              {characters.length}/{campaign.max_players} characters
            </h3>
          :
          null
        }
        {
          this.props.nav === 'More' ?
            <Popup trigger={
              <button disabled={this.props.loading} onClick={() => this.toggleJoining()} id='joinCampaignBtn'>
              Join</button>} position="center center">
              { close => (
                <div id='joinCampaignPopup'>
                  {
                    this.props.freeCharacters.length > 0 ?
                      this.props.freeCharacters.map(c => {
                        return(
                          <CharacterCard key={c.id} popup={true} campaign={campaign}
                            character={c} joinCampaign={this.joinCampaign} close={close}/>
                        );
                      })
                    :
                    "You don't have any available characters. Create a new character to join."
                  }
                </div>
              )}
            </Popup>
          :
          null
        }
        {
          typeof this.pageResults() !== 'undefined' ?
            <Fragment>
              <br />
              <div className='showHeader'>
                <h1 id='showTitle'>{campaign.name}</h1>
              </div>
              <p id='campaignShowDesc'>{campaign.description}</p>
            </Fragment>
          :
          null
        }
        {
          typeof this.pageResults() !== 'undefined' ?
            characters.map(c => <CharacterCard key={c.id} character={c} />)
          :
          null
        }
        <br />
        {
          typeof this.pageResults() !== 'undefined' && this.findMatch().characters.length > 7 ?
            <Fragment>
              <button
                disabled={this.state.currentPage === 1 ? true : false}
                className='showToggle' id='leftShowT'
                onClick={() => this.pageInc(-1)}>◀◀Prev</button>
              <button
                disabled={this.state.currentPage*4 >= this.props.discover.length ? true : false}
                className='showToggle' onClick={() => this.pageInc(1)}>Next▶▶</button>
            </Fragment>
          :
          null
        }
      </div>
      );
    };

};

const mapStateToProps = state => {
  return {
    nav: state.campaign.nav,
    loading: state.load.characterLoading,
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns,
    discover: state.campaign.discover,
    freeCharacters: state.character.freeCharacters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCampaign: (cc) => {
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: cc })
    },
    setFreeCharacters: (characters) => {
      dispatch({ type: 'SET_FREE_CHARACTERS', payload: characters })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignShow);
