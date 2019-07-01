import React, { Component } from 'react';

import { connect } from 'react-redux';

import Spinner from '../components/Spinner'

class HomePage extends Component {

  render() {
    return (
      <div>
        {
          this.props.loadState ?
            <Spinner />
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
