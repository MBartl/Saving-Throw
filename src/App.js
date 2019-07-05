import React, { Component } from 'react';

import './App.css';
import './Loader.css';

import Header from './containers/Header';
import Sidebar from './containers/Sidebar';
import Loader from './Loader';
import Body from './containers/Body';
import Footer from './containers/Footer';

import { url } from './route';
import { connect } from 'react-redux';


class App extends Component {

  // Auto Login
  componentDidMount(){
    const token = localStorage.getItem('token');

    if (token !== null) {
      fetch(url + 'auto_login', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem('token')
          alert(response.errors)
        } else {
          this.props.autoLogin(response)
          this.props.loading()
        }
      })
    } else {
      this.props.loading()
    };
  };

  setCharacters = () => {
    const token = localStorage.getItem('token');

    if (this.props.characters.length === 0) {
      fetch(url + 'characters', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
          alert(doc.errors)
        } else
        if (doc.characters) {
          this.props.setCharacters(doc.characters)
        };
      })
      .then(() => {
        this.setCampaigns();
        this.props.characterLoad();
      })
    }
    else {
      this.props.setCharacters(this.props.characters)
    };
  };

  setCampaigns = () => {
    const token = localStorage.getItem('token');

    if (this.props.campaigns.length === 0 &&
      this.props.characterCampaigns.length === 0) {

      fetch(url + 'campaigns', {
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
        this.props.campaignLoad()}
      );
    }
    else {
      this.props.setCampaign(this.props.campaigns);
      this.props.setCharacterCampaigns(this.props.characterCampaigns);
    };
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Sidebar setCampaigns={this.setCampaigns}
          setCharacters={this.setCharacters} />
        {
          this.props.loadState ?
            <Loader /> :
            <Body setCharacters={this.setCharacters}
              setCampaigns={this.setCampaigns} />
        }
        <Footer />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    user: state.user,
    campaigns: state.campaign.campaigns,
    characterCampaigns: state.campaign.characterCampaigns,
    characters: state.character.characters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loading: () => {
      dispatch({type: 'LOADING'})
    },
    autoLogin: (user) => {
      dispatch({type: 'LOG_IN', payload: user})
    },
    characterLoad: () => {
      dispatch({ type: 'CHARACTER_LOADING' })
    },
    setCharacters: (characters) => {
      dispatch({ type: 'SET_CHARACTERS', payload: characters })
    },
    campaignLoad: () => {
      dispatch({ type: 'CAMPAIGN_LOADING' })
    },
    setCampaign: (campaigns) => {
      dispatch({ type: 'SET_CAMPAIGNS', payload: campaigns })
    },
    setCharacterCampaigns: (characterCampaigns) => {
      dispatch({ type: 'SET_CHARACTER_CAMPAIGNS', payload: characterCampaigns })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
