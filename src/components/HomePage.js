import React, { Component } from 'react';

import { connect } from 'react-redux';

class HomePage extends Component {

  render() {
    return (
      <div style={{backgroundColor: 'black'}}>
        {this.props.user.currentUser ?

          <h1>Welcome {this.props.user.currentUser.username}</h1> :

          <h1>This is the logged out homepage</h1>
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
