import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  logOut = () => {
    this.props.logOut(this.props.user);
    this.props.resetCampaigns();
    this.props.resetCharacters();
    localStorage.removeItem("token");
  };

  render() {
    return (
      <div id='header'>
        <h1>Saving Throw</h1>
        {
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
      </div>
    );
  };

}

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
