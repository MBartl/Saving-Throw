import React, { Component } from 'react';

import { connect } from 'react-redux';

import Loader from '../components/Loader'

class HomePage extends Component {

  render() {
    return (
      <div id='homepage'>
        {
          this.props.loadState ?
            <Loader />
          :
          this.props.user.currentUser ?

            <h1>Welcome {this.props.user.currentUser.name}</h1>

          : <h1>This is the logged out homepage</h1>
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(HomePage);
