import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {

  logOut = () => {
    this.props.logOut(this.props.user);
    this.props.resetCampaigns();
    this.props.resetCharacters();
    localStorage.removeItem('token');
  };

  render() {
    return (
      <div id='header'>
        {
          this.props.user.currentUser === null ?
            <Fragment>
              <Link to='/home'>
                <button id='home' className='actBtn'>Home</button>
              </Link>
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
            <Link to='/home'>
              <button id='home' className='actBtn'>Home</button>
            </Link>
            <h1 id='title'>Saving Throw</h1>
            <Link to='/home'>
              <button onClick={this.logOut} className='actBtn R'>Log Out</button>
            </Link>
            <button className='actBtn R'>Settings</button>
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
      dispatch({type: 'LOG_OUT', payload: token})
    },
    resetCampaigns: () => {
      dispatch({type: 'RESET_CAMPAIGNS'})
    },
    resetCharacters: () => {
      dispatch({type: 'RESET_CHARACTERS'})
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
