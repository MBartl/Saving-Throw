import React, { Component } from 'react';

import Loader from '../Loader';

import { connect } from 'react-redux';


class HomePage extends Component {

  componentDidMount() {
    this.props.setCharacters();
  };

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
  };

};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps
)(HomePage);
