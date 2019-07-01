import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {

  render() {
    return (
      <div id='sidebar'>
        {
          this.props.user.currentUser ?
            <Fragment>
              <Link to='/campaigns'>
                <button id='topSideBtn'
                className='sideBtn'>Campaigns</button>
              </Link>
              <Link to='/characters'>
                <button className='sideBtn'>Characters</button>
              </Link>
            </Fragment> :
            <Fragment>
              <br />
            </Fragment>
        }
        { this.props.loadState ? null :
        <Link to='/'>
          <button className='sideBtn'>Compendium</button>
        </Link>
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.load.loading,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Sidebar);
