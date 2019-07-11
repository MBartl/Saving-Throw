import React, { Component } from 'react';

import { URL, HEADERS, LOG_IN } from '../constants'

import HomePage from './HomePage';
import Loader from '../Loader';

import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';

import CampaignsHome from './campaigns/CampaignsHome';
import CharactersHome from './characters/CharactersHome';

import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Body extends Component {

  signIn = (userInput) => {
    let path;
    userInput.user ? path = 'users' : path = 'login';

    fetch(URL + path, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(userInput)
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors) {
        const errors = response.errors.split('<<|>>');
        alert(errors);
      } else {
        localStorage.setItem("token", response.token);
        this.props.login(response.user);

        if (response.path === 'signup'|| response.path === 'login') {
          // Add new user routine for signup path
          this.props.history.push('/home');
        };
      };
    })
    .then(() => {
      if (this.props.user) {
        this.props.setCharacters();
        this.props.setCampaigns();
        this.props.setChats();
        this.props.bufferOff();
      };
    });
  };

  render() {
    return (
      <div id='body'>
        {
          this.props.loadState && this.state.user ?
            <Loader />
          :
          <Switch>
            <Route path='/home' render={(routerProps) => {
              return <HomePage {...routerProps} setCampaigns={this.props.setCampaigns}
                setCharacters={this.props.setCharacters}/>
            }} />
            <Route path='/login' render={(routerProps) => {
              return <LogInForm signIn={this.signIn} {...routerProps} />
            }} />
            <Route path='/signup' render={(routerProps) => {
              return <SignUpForm signIn={this.signIn} {...routerProps} />
            }} />

            <Route path='/(campaigns|more-campaigns|new-campaign)/'
              render={(routerProps) => {
                return <CampaignsHome {...routerProps}
                  setCampaigns={this.props.setCampaigns} />
              }} />

            <Route path='/(characters|new-character)' render={(routerProps) => {
              return <CharactersHome {...routerProps}
                setCharacters={this.props.setCharacters} />
            }} />
            <Redirect from='/' to='/home' />
          </Switch>
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      dispatch({ type: LOG_IN, payload: user })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Body));
