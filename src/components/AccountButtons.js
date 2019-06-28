import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AccountButtons extends Component {

  logOut = () => {
    this.props.logOut(this.props.user)
    localStorage.removeItem("token")
  }

  render() {
    return (
      <Fragment>
        { this.props.loadState.loading ? null :
          this.props.user.currentUser === null ?
            <Fragment>
              <Link to='/home'>
                <button>Home</button>
              </Link>
              <Link to='/signup'>
                <button className='actBtn'>Sign Up</button>
              </Link>
              <Link to='/login'>
                <button className='actBtn'>Log In</button>
              </Link>
            </Fragment>
          :
          <Fragment>
            <Link to='/home'>
              <button>Home</button>
            </Link>
            <Link to='/home'>
              <button onClick={this.logOut}
              className='actBtn'>Log Out</button>
            </Link>
            <button className='actBtn'>Settings</button>
          </Fragment>
        }
      </Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.loading,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: (token) => {
      dispatch({type: 'LOG_OUT', payload: token})
    }
  }
}
