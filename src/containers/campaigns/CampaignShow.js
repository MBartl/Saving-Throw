import React, { Component, Fragment } from 'react';

import { URL, HEADERS, UPDATE_CAMPAIGN, SET_FREE_CHARACTERS, UPDATE_CHAT } from '../../constants'

import CharacterCard from '../../components/CharacterCard';
import Popup from 'reactjs-popup';

import { connect } from 'react-redux';


class CampaignShow extends Component {

  state = {
    titleEdit: false,
    descEdit: false,
    currentPage: 1
  };

  findMatch = () => {
    return [...this.props.campaigns, ...this.props.characterCampaigns, ...this.props.discover].find(c => c.campaign.id === parseInt(this.props.match.params.id));
  };

  pageResults = () => {
    if (typeof this.findMatch() !== 'undefined') {
      const characters = this.findMatch().characters;
      const page = this.state.currentPage;
      const results = characters.slice((page-1)*8, (page-1)*8+8);

      return results;
    };
  };

  pageInc = (inc) => {
    this.setState({
      currentPage: this.state.currentPage+inc
    });
  };

  setTitle = () => {
    return {__html: `${this.findMatch().campaign.name}`};
  };

  titleEdit = () => {
    this.setState({
      titleEdit: !this.state.titleEdit
    });
  };

  checkTitleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const name = e.target.innerText;

      this.titleEdit();
      fetch(URL + `campaigns/${this.findMatch().campaign.id}`, {
        method: 'PATCH',
        headers: {...HEADERS,
          'Authorization': token
        },
        body: JSON.stringify({ name })
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
        alert(doc.errors)
      } else {
        this.props.updateCampaign(doc.campaign);
      }});
    };
  };

  setDesc = () => {
    return {__html: `${this.findMatch().campaign.description}`};
  };

  descEdit = () => {
    this.setState({
      descEdit: !this.state.descEdit
    });
  };

  checkDescKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const description = e.target.innerText;

      this.descEdit();
      fetch(URL + `campaigns/${this.findMatch().campaign.id}`, {
        method: 'PATCH',
        headers: {...HEADERS,
          'Authorization': token
        },
        body: JSON.stringify({ description })
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
        alert(doc.errors)
      } else {
        this.props.updateCampaign(doc.campaign);
      }});
    };
  };

  joinCampaign = (campaign, character) => {
    const token = localStorage.getItem('token');

    const campaign_id = campaign.id;
    const character_id = character.id;

    fetch(URL + 'join-campaign', {
      method: 'POST',
      headers: {...HEADERS,
        'Authorization': token
      },
      body: JSON.stringify({ campaign: { campaign_id, character_id } })
    })
    .then(res => res.json())
    .then(doc => {
      if (doc.errors) {
      alert(doc.errors)
    } else {
      this.props.updateCampaign(doc.campaign);
      this.props.setFreeCharacters(this.props.freeCharacters.filter(c => c.id !== doc.character_id));
      this.props.updateChat(doc.chat)
    }});
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
            <h3 className={this.props.nav === 'Home' ? 'campaignCharCount' :
            'campaignCharCount D'}>
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
                {
                  this.props.campaigns.map(c => c.campaign).includes(campaign) ?
                    <Fragment>
                      <button onClick={() => this.titleEdit()} id='titleEditBtn'>
                        <span id='titleEditBtn'>✎</span>
                      </button>
                      <h1 id={'titleEditContainer'}>
                        <span contentEditable={this.state.titleEdit}
                          id={this.state.titleEdit ? 'titleEditS' : 'titleEdit'}
                          onKeyDown={(e) => this.checkTitleKey(e)} dangerouslySetInnerHTML={this.setTitle()}>
                        </span>
                      </h1>
                    </Fragment>
                  :
                  <h1 id='showTitle'>{campaign.name}</h1>
                }
              </div>
              {
                this.props.campaigns.map(c => c.campaign).includes(campaign) ?
                  <div id='descContainer'>
                    <button onClick={() => this.descEdit()} id='descEditBtn'>
                      <span id='descEditText'>✎</span>
                    </button>
                    <p id='campaignShowDesc'>
                      <span contentEditable={this.state.descEdit}
                        id={this.state.descEdit ? 'descEditS' : 'descEdit'}
                        onKeyDown={(e) => this.checkDescKey(e)} dangerouslySetInnerHTML={this.setDesc()}>
                      </span>
                    </p>
                  </div>
                :
                <p id='campaignShowDescN'>{campaign.description}</p>
              }
            </Fragment>
          :
          null
        }
        <div className={this.props.nav === 'More' ? 'campaignCardContainer' : 'cardContainerNil'}>
          {
            typeof this.pageResults() !== 'undefined' ?
              characters.map(c => <CharacterCard key={c.id} character={c} />)
            :
            null
          }
        </div>
        <br />
        {
          typeof this.pageResults() !== 'undefined' && this.findMatch().characters.length > 8 ?
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
    updateCampaign: (campaign) => {
      dispatch({ type: UPDATE_CAMPAIGN, payload: campaign })
    },
    setFreeCharacters: (characters) => {
      dispatch({ type: SET_FREE_CHARACTERS, payload: characters })
    },
    updateChat: (chat) => {
      dispatch({ type: UPDATE_CHAT, payload: chat })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignShow);
