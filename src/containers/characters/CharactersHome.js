import React, { Component, Fragment } from 'react';

import MainCharacter from './MainCharacter';
import CharacterShow from './CharacterShow';
import NewCharacterForm from '../../components/NewCharacterForm';
import Loader from '../../Loader';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';


class CharactersHome extends Component {

  componentDidMount(){
    this.props.setCharacters();
  };

  render() {
    return (
      <div>
        {
          this.props.loadState ?
            <Loader />
          :
          <Fragment>
            <Route exact path='/characters' render={(routerProps) => {
              return <MainCharacter characters={this.props.characters} {...routerProps} />
            }} />
            <Route path='/characters/:id' render={(routerProps) => {
              return <CharacterShow {...routerProps} />
            }} />
            <Route path='/new-character' render={(routerProps) => {
              return <NewCharacterForm setCharacters={this.props.setCharacters} {...routerProps} />
            }} />
          </Fragment>

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
