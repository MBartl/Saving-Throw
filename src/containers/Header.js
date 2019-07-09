import React, { Component, Fragment } from 'react';

import { LOG_OUT, RESET_CAMPAIGNS, RESET_CHARACTERS, RESET_LOADINGS } from '../constants'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {

  logOut = () => {
    this.props.logOut(this.props.user);
    this.props.resetCampaigns();
    this.props.resetCharacters();
    this.props.resetLoadings();
    localStorage.removeItem('token');
  };

  render() {
    return (
      <div id='header'>
        {
          this.props.user.currentUser === null ?
            <Fragment>
              <h1 id='title'>Saving Throw</h1>
              <Link className='actBtn R' to='/signup'>
                <button className='actBtn R' id='signup'>
                  {this.props.loadState ? null :"Sign Up"}
                </button>
              </Link>
              <Link to='/login'>
                <button className='actBtn R'>
                  {this.props.loadState ? null : "Log In"}
                </button>
              </Link>
            </Fragment>
          :
          <Fragment>
            <h1 id='title'>Saving Throw</h1>
            <Link to='/home'>
              <button onClick={this.logOut} className='actBtn R'>Log Out</button>
            </Link>
            <Link to='/home'>
              <button id='home' className='actBtn R'>Home</button>
            </Link>
          </Fragment>
        }
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: (token) => {
      dispatch({type: LOG_OUT, payload: token})
    },
    resetCampaigns: () => {
      dispatch({type: RESET_CAMPAIGNS})
    },
    resetCharacters: () => {
      dispatch({type: RESET_CHARACTERS})
    },
    resetLoadings: () => {
      dispatch({type: RESET_LOADINGS})
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
