import React, { Component } from 'react';

import { URL, LOADING, LOG_IN, CHARACTER_LOADING, SET_CHARACTERS, SET_FREE_CHARACTERS, CAMPAIGN_LOADING, SET_CAMPAIGNS, SET_CHARACTER_CAMPAIGNS, SET_CHATS, SET_MESSAGES } from './constants'

import './App.css';
import './Loader.css';
import './SideLoader.css';

import Header from './containers/Header';
import Sidebar from './containers/Sidebar';
import Loader from './Loader';
import Body from './containers/Body';
import Chat from './containers/chat/Chat'
import Footer from './containers/Footer';

import { connect } from 'react-redux';


class App extends Component {

  // Chat options and prompt
  state = {
    buffer: true,
    hideChats: true,
    displayWarning: false
  }

  // Auto Login
  componentDidMount(){
    const token = localStorage.getItem('token');

    if (token !== null) {
      fetch(URL + 'auto_login', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem('token');
          alert(response.errors);
        } else {
          this.props.autoLogin(response);
          this.props.loading();
          this.bufferOff();
        }
      })
    } else {
      this.props.loading();
      this.bufferOff();
    };
  };

  setCharacters = () => {
    const token = localStorage.getItem('token');

    if (token && this.props.characters.length === 0) {
      fetch(URL + 'characters', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
          alert(doc.errors);
        } else
        if (doc.characters) {
          this.props.setCharacters(doc.characters);
          this.props.setFreeCharacters(doc.characters.filter(c => c.campaign_characters.length === 0));
        };
      })
      .then(() => {
        this.setCampaigns();
        this.setChats();
        this.props.characterLoad();
      });
    }
    else {
      this.props.setCharacters(this.props.characters)
    };
  };

  setCampaigns = () => {
    const token = localStorage.getItem('token');

    if (token && this.props.campaigns.length === 0 &&
      this.props.characterCampaigns.length === 0) {

      fetch(URL + 'campaigns', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
          alert(doc.errors)
        } else
        if (doc.campaigns) {
          this.props.setCampaign(doc.campaigns)
        }
        if (doc.characterCampaigns) {
          this.props.setCharacterCampaigns(doc.characterCampaigns)
        }
      })
      .then(() => {
        this.setCharacters();
        this.setChats();
        this.props.campaignLoad()}
      );
    }
    else {
      this.props.setCampaign(this.props.campaigns);
      this.props.setCharacterCampaigns(this.props.characterCampaigns);
    };
  };

  setChats = () => {
    const token = localStorage.getItem('token');

    if (token && this.props.chats.length === 0) {
      fetch(URL + 'chats', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(chats => {
        if (chats.length) {
          this.props.setChats(chats)
          chats.map(chat => chat.messages).forEach(list => {
            if (!this.props.messages.map(m => m.id).includes(list[0].id)) {
              this.props.setMessages(list)
            }
          })
        }
      })
      .then(() => this.displayWarning());
    };
  };

  displayWarning = () => {
    this.setState({
      displayWarning: true
    });
  };

  toggleChats = () => {
    this.setState({
      hideChats: !this.state.hideChats
    });
  };

  closeChatOptions = () => {
    this.setState({
      hideChats: true
    });
  };

  bufferOff = () => {
    if (this.state.buffer === false) {return}
    this.setState({
      buffer: false
    })
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Sidebar setCampaigns={this.setCampaigns}
          setCharacters={this.setCharacters}
          closeChatOptions={this.closeChatOptions}
          buffer={this.state.buffer}/>
        {
          this.props.loadState ?
            <Loader /> :
            <Body setCharacters={this.setCharacters}
              setCampaigns={this.setCampaigns}
              setChats={this.setChats}
              bufferOff={this.bufferOff}/>
        }
        <Chat setChats={this.setChats} toggleChats={this.toggleChats}
          hideChats={this.state.hideChats} displayWarning={this.state.displayWarning} />
        <Footer />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    chats: state.chat.chats,
    messages: state.chat.messages,
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns,
    characters: state.character.characters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loading: () => {
      dispatch({ type: LOADING })
    },
    autoLogin: (user) => {
      dispatch({ type: LOG_IN, payload: user })
    },
    characterLoad: () => {
      dispatch({ type: CHARACTER_LOADING })
    },
    setCharacters: (characters) => {
      dispatch({ type: SET_CHARACTERS, payload: characters })
    },
    setFreeCharacters: (characters) => {
      dispatch({ type: SET_FREE_CHARACTERS, payload: characters })
    },
    campaignLoad: () => {
      dispatch({ type: CAMPAIGN_LOADING })
    },
    setCampaign: (campaigns) => {
      dispatch({ type: SET_CAMPAIGNS, payload: campaigns })
    },
    setCharacterCampaigns: (characterCampaigns) => {
      dispatch({ type: SET_CHARACTER_CAMPAIGNS, payload: characterCampaigns })
    },
    setChats: (chats) => {
      dispatch({ type: SET_CHATS, payload: chats })
    },
    setMessages: (messages) => {
      dispatch({ type: SET_MESSAGES, payload: messages })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
