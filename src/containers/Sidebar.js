import React, { Component, Fragment } from 'react';

import { CHANGE_NAV, LOG_OUT, RESET_CAMPAIGNS, RESET_CHARACTERS, RESET_LOADINGS, RESET_CHATS } from '../constants'

import SideLoader from '../SideLoader';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Sidebar extends Component {

  logOut = () => {
    this.props.logOut(this.props.user);
    this.props.closeChatOptions();
    localStorage.removeItem('token');
  };

  render() {
    const loadState = this.props.charLoadState || this.props.campLoadState
    const loading = this.props.user && loadState
    return (
      <div id='sidebar'>
        { loading ?
          <SideLoader />
        :
            null
        }
        <Link to='/home'>
          <button id='home' className={loading ? 'addSideBtn' : 'sideBtn'}>Home</button>
        </Link>
        { this.props.user ?
          <Fragment>
            <Link to='/characters'>
              <button disabled={this.props.charLoadState}
              className='addSideBtn'>Characters</button>
            </Link>
            <Link to='/campaigns'>
              <button disabled={this.props.campLoadState} onClick={() => this.props.setNav('Home')} className='addSideBtn'>Campaigns</button>
            </Link>
            <Link to='/home'>
              <button disabled={this.props.campLoadState && this.props.charLoadState} onClick={this.logOut} className='addSideBtn'>Log Out</button>
            </Link>
          </Fragment>
        :
        <Fragment>
          <Link className='addSideBtn' to='/signup'>
            <button className='addSideBtn' id='signup'>
              {this.props.loadState ? null :"Sign Up"}
            </button>
          </Link>
          <Link to='/login'>
            <button className='addSideBtn'>
              {this.props.loadState ? null : "Log In"}
            </button>
          </Link>
        </Fragment>
        }
        <div id='bottomAnchor'></div>
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    charLoadState: state.load.characterLoading,
    campLoadState: state.load.campaignLoading,
    user: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNav: (nav) => {
      dispatch({ type: CHANGE_NAV, payload: nav })
    },
    logOut: (token) => {
      dispatch({type: LOG_OUT, payload: token})
      dispatch({type: RESET_CAMPAIGNS})
      dispatch({type: RESET_CHARACTERS})
      dispatch({type: RESET_LOADINGS})
      dispatch({type: RESET_CHATS})
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
