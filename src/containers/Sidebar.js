import React, { Component, Fragment } from 'react';

import SideLoader from '../SideLoader';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Sidebar extends Component {

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
        { this.props.user ?
          <Fragment>
            <Link to='/characters'>
              <button disabled={this.props.charLoadState}
                className={loading ? 'addSideBtn' : 'sideBtn'}>Characters</button>
            </Link>
            <Link to='/campaigns'>
              <button  disabled={this.props.campLoadState}
              className='addSideBtn'>Campaigns</button>
            </Link>
          </Fragment>
        :
          null
        }
        { this.props.loadState ? null :
        <Link to='/'>
          <button className={loading || this.props.user ? 'addSideBtn' : 'sideBtn'}>Compendium</button>
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
