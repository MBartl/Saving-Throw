import React, { Component, Fragment } from 'react';

import Loader from '../../Loader';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class CharactersHome extends Component {

  componentDidMount(){
    this.props.setCharacters();
  };

  render() {
    return (
      <div>
        <Link to='/new-character'>
          <button className='bodyBtn' id='characterBtn'>Create</button>
        </Link>
        {
          this.props.loadState ?
            <Loader />
          :
          this.props.characters.length !== 0 ?
            <Fragment>
              <h2>Your Characters:</h2>
              <ul>
                {this.props.characters.map((character, index) => {
                  return <li key={index}>{character.name}</li>
                })}
              </ul>
            </Fragment>
          :
          null
        }
        {
          !this.props.characters && !this.props.loadState ?
            <h2>You don't have any characters yet</h2>
          :
          null
        }
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    loadState: state.load.characterLoading,
    characters: state.character.characters
  };
};

export default connect(
  mapStateToProps
)(CharactersHome);
