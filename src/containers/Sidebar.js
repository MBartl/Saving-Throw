import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Sidebar extends Component {

  render() {
    return (
      <div id='sidebar'>
        {
          this.props.user ?
            <Fragment>
              <Link to='/characters'>
                <button className='sideBtn'>Characters</button>
              </Link>
              <Link to='/campaigns'>
                <button className='addSideBtn'>Campaigns</button>
              </Link>
            </Fragment> :
            null
        }
        { this.props.loadState ? null :
        <Link to='/'>
          <button className={this.props.user ? 'addSideBtn' : 'sideBtn'}>
            Compendium
          </button>
        </Link>
        }
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

export default connect(
  mapStateToProps
)(Sidebar);
