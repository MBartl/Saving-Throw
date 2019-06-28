import React, { Component } from 'react';
import './App.css';

import Header from './containers/Header'
import Sidebar from './containers/Sidebar'
import Spinner from './components/Spinner'
import Body from './containers/Body'

import { url } from './route'

import { connect } from 'react-redux';

class App extends Component {

  // Auto Login
  componentDidMount(){
    const token = localStorage.getItem('token')

    if (token !== null) {
      fetch(url + 'auto_login', {
        headers: {
          'Authorization': token
        }
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
    }
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Sidebar />
        {
          this.props.loadState.loading ?
            <Spinner /> :
            <Body />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadState: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: () => {
      dispatch({type: 'LOADING'})
    },
    autoLogin: (user) => {
      dispatch({type: 'LOG_IN', payload: user})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
