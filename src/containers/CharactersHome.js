import React, { Component, Fragment } from 'react';

import { url } from '../route'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Loader from '../components/Loader'

class CharactersHome extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')

    if (this.props.characters.length === 0) {

      this.props.characterLoad()

      fetch(url + 'characters', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(doc => {
        if (doc.errors) {
          alert(doc.errors)
        } else
        if (doc.characters) {
          this.props.setCharacters(doc.characters)
        }
      })
      .then(() => this.props.characterLoad())
    }
    else {
      this.props.setCharacters(this.props.characters)
    }
  }

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
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.load.characterLoading,
    characters: state.character.characters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    characterLoad: () => {
      dispatch({ type: 'CHARACTER_LOADING' })
    },
    setCharacters: (characters) => {
      dispatch({ type: 'SET_CHARACTERS', payload: characters })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersHome);
