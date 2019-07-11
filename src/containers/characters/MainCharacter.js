import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

import CharacterCard from '../../components/CharacterCard';

class MainCharacter extends Component {

  render() {
    return (
      <Fragment>
        <Link to='/new-character'>
          <button className='bodyBtn' id='characterBtn'>Create</button>
        </Link>
        {
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
          !this.props.characters ?
            <h2>You don't have any characters yet</h2>
          :
          null
        }
      </Fragment>
    );
  }

}

export default MainCharacter;
