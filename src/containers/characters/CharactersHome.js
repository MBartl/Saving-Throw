import React, { Component, Fragment } from 'react';

import CharacterCard from '../../components/CharacterCard';
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
              <div id='charHeader'>
                <h2>Your Characters:</h2>
              </div>
              <div id='charCardContainer'>
                {this.props.characters.map((c, index) => {
                  return <CharacterCard key={index} character={c} />
                })}
              </div>
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
