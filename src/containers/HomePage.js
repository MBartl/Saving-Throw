import React, { Component } from 'react';

import Loader from '../Loader';

import { connect } from 'react-redux';


class HomePage extends Component {

  componentDidMount() {
    if (this.props.user !== null) {
      this.props.setCharacters();
    }
  };

  render() {
    return (
      <div id='homepage'>
        {
          this.props.loadState ?
            <Loader />
          :
          this.props.user ?

            <h1 className='homepageText'>Welcome {this.props.user.name}</h1>

          : <h1 className='homepageText'>This is the logged out homepage</h1>
        }
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  };
};

export default connect(
  mapStateToProps
)(HomePage);
