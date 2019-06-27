import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

import HomePage from '../components/HomePage';
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';

import { connect } from 'react-redux';

class Body extends Component {

  logIn = (userInput) => {
    let path;
    userInput.confirmation ?  path = 'users' : path = 'login';

    fetch('http://localhost:3000/api/' + path, {
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
        alert(response.errors)
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
          <Switch>
            <Route path='/home' render={(routerProps) => {
              return <HomePage {...routerProps} />
            }} />
            <Route path='/login' render={(routerProps) => {
              return <LogInForm logIn={this.logIn} {...routerProps} />
            }} />
            <Route path='/signup' render={(routerProps) => {
              return <SignUpForm logIn={this.logIn} {...routerProps} />
            }} />
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      // }
    );
  }
}

const mapStateToProps = state => {
  return {
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
