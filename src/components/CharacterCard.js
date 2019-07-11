import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';


class CharacterCard extends Component {

  handleSelect = (e) => {
    this.props.close(e);
    this.props.joinCampaign(this.props.campaign, this.props.character);
  };

  routeToShow = (e) => {
    // disabled route to show for now
    return


    // if (e.target.id === "joinSubmitBtn") {
    //   this.handleSelect(e);
    // }
    // else {
    //   this.props.history.push(`/characters/${this.props.character.id}`);
    // };
  };

  raceDisplay = () => {
    const races = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"]

    return races[this.props.character.race_id-1]
  }

  playerClassDisplay = () => {
    const pclass = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

    return pclass[this.props.character.player_class_id-1]
  }


  render() {
    const character = this.props.character
    return (
      <div onClick={this.routeToShow} className={this.props.popup ? 'charCard S' : 'charCard'}>
        {
          this.props.popup ?
            <button id='joinSubmitBtn' onClick={this.handleSelect}>Select</button>
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

        { this.props.character.player_class && this.props.character.race ?
          <p className='raceAndClass'>
            {this.props.character.race.name} {this.props.character.player_class.name}
          </p>
        :
        <p className='raceAndClass'>
          {this.raceDisplay()} {this.playerClassDisplay()}
        </p>
        }
      </div>
    );
  };

};

export default withRouter(CharacterCard);
