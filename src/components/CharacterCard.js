import React, { Component } from 'react';

import { connect } from 'react-redux';


class CharacterCard extends Component {

  handleClick = (e) => {
    this.props.close(e);
    this.props.joinCampaign(this.props.campaign, this.props.character);
  };

  render() {
    const character = this.props.character
    return (
      <div className={this.props.popup ? 'charCard S' : 'charCard'}>
        {
          this.props.popup ?
            <button onClick={(e) => this.handleClick(e)} id='joinSubmitBtn'>Select</button>
          :
          null
        }
        <h3 className='charName'>{character.name}</h3>
        <p className='charBio'>
          {
            this.props.popup ?
              character.bio.length > 90 ?
                character.bio.slice(0, 90) + '...'
              : character.bio
            :
            character.bio.length > 114 ?
              character.bio.slice(0, 114) + '...'
            : character.bio
          }
        </p>

        <p className='charRightNums'>LVL: {character.level}<br />
          HP: {character.hit_points}</p>

        {
          this.props.popup ?
            <p className='raceAndClass'>
              {this.props.character.race.name} {this.props.character.player_class.name}
            </p>
          :
          <p className='raceAndClass'>
            {this.props.races[character.race_id-1]} {this.props.classes[character.player_class_id-1]}
          </p>
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    races: state.race.races,
    classes: state.class.classes
  };
};

export default connect(
  mapStateToProps
)(CharacterCard);
