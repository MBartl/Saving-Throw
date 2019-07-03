import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

import HomePage from './HomePage';
import CampaignsHome from './CampaignsHome';
import CharactersHome from './CharactersHome'

import Loader from '../components/Loader'
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';

import NewCharacterForm from '../components/NewCharacterForm';

import { url } from '../route'

import { connect } from 'react-redux';

class Body extends Component {

  signIn = (userInput) => {
    let path;
    userInput.user ? path = 'users' : path = 'login';

    fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        const errors = response.errors.split('<<|>>')
        alert(errors)
      } else {
        localStorage.setItem("token", response.jwt)
        this.props.login(response.user)
        this.props.history.push('/home')
      }
    })
  }

  render() {
    return (
        <div id='body'>
          {
            this.props.loadState ?
              <Loader />
            :
            <Switch>
              <Route path='/home' render={(routerProps) => {
                return <HomePage {...routerProps} />
              }} />
              <Route path='/login' render={(routerProps) => {
                return <LogInForm signIn={this.signIn} {...routerProps} />
              }} />
              <Route path='/signup' render={(routerProps) => {
                return <SignUpForm signIn={this.signIn} {...routerProps} />
              }} />
              <Route path='/campaigns' render={(routerProps) => {
                return <CampaignsHome {...routerProps} />
              }} />
              <Route path='/new-campaign' render={(routerProps) => {
                return <CampaignsHome {...routerProps} />
              }} />
              <Route path='/characters' render={(routerProps) => {
                return <CharactersHome {...routerProps} />
              }} />
              <Route path='/new-character' render={(routerProps) => {
                return <NewCharacterForm {...routerProps} />
              }} />
              <Redirect from='/' to='/home' />
            </Switch>
          }
        </div>
      // }
    );
  }
}

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      dispatch({ type: 'LOG_IN', payload: user })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Body));
