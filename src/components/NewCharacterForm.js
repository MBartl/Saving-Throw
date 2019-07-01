import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

import { url } from '../route'
import { connect } from 'react-redux';

class NewCharacterForm extends Component {

  state = {
    lvl: 1,
    classIndex: 0,
    raceIndex: 0,
    class: 'Barbarian',
    race: 'Dwarf',
    abilityScores: [{key: 'Strength', value: 8}, {key: 'Dexterity', value: 8},
    {key: 'Constitution', value: 8}, {}, {key: 'Intelligence', value: 8},
    {key: 'Wisdom', value: 8}, {key: 'Charisma', value: 8}]
  }

  handleSubmit = (e) => {
    e.preventDefault()
    debugger

    const token = localStorage.getItem('token')

    let name = e.target.name.value
    let biography = e.target.biography.value
    let level = e.target.level.value
    let character = {character: {name, biography, level}}

    fetch(url + 'characters', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(character)
    })
    .then(res => res.json())
    .then(character => {
      if (character.errors) {
        alert(character.errors)
      } else {
      this.props.addCampaign(character)
      this.props.history.push('/characters')
      }
    })
  }

  toggleClass = (increment) => {
    if (this.state.classIndex < 1 && increment === -1) {
      this.setState({
        classIndex: 11
      }, () => this.setClass())
    } else if (this.state.classIndex > 10 && increment === 1) {
      this.setState({
        classIndex: 0
      }, () => this.setClass())
    } else {
      this.setState({
        classIndex: this.state.classIndex+increment
      }, () => this.setClass())
    }
  }

  setClass = () => {
    this.setState({
      class: this.displayClass()
    })
  }

  displayClass = () => {
    const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

    return classes[this.state.classIndex]
  }

  toggleRace = (increment) => {
    if (this.state.raceIndex < 1 && increment === -1) {
      this.setState({
        raceIndex: 8
      }, () => this.setRace())
    } else if (this.state.raceIndex > 7 && increment === 1) {
      this.setState({
        raceIndex: 0
      }, () => this.setRace())
    } else {
      this.setState({
        raceIndex: this.state.raceIndex+increment
      }, () => this.setRace())
    }
  }

  setRace = () => {
    this.setState({
      race: this.displayRace()
    })
  }

  displayRace = () => {
    const races = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"];

    return races[this.state.raceIndex];
  }

  handleChange = (e, ability) => {
    let index = this.state.abilityScores.findIndex((s) => s.key === ability.key)

    let scores = this.state.abilityScores
    scores.splice(index, 1, {key: ability.key, value: parseInt(e.target.value)})

    this.setState({
      abilityScores: [...scores]
    })
  }

  handleLevel = (e) => {
    this.setState({
      lvl: e.target.value
    })
  }

  // componentDidMount({
  //   this.setState({
  //
  //   })
  // })

  render() {
    console.log(this.state.class, this.state.race)
    return (
      <Fragment>
        <Link to='characters'>
          <button id='characterBtn'>Back</button>
        </Link>
        <form id='characterForm' onSubmit={this.handleSubmit}>
          <div id='charNameInput'>
            <img id='nameImg' src='charactersheet.png'
            alt='D&D character form name background' />
            <input id='charNameField' placeholder='Character Name' />
          </div>

          <div id='level' className='level'>
            <input className='level' type='number' name='max_players'
              min='1' max='20' value={this.state.lvl} onChange={this.handleLevel} />
            <label className='level' value='playerClass'>Level: </label>
          </div>

          <br /><br />
          <label value='playerClass'>
            <h3 className='charHeader'>Class</h3>
          </label>
          <label value='playerRace' id='raceHeader'>
            <h3 className='charHeader' style={{marginLeft: '4.35em'}}>Race</h3>
          </label><br />

          <div>
            <button className='charToggle' type='button' style={{left: '11em'}}
              onClick={() => this.toggleClass(-1)}>
              <span>◀ </span>
            </button>
            <div id='classDisplay' value='playerClass'>{this.displayClass()}</div>
            <button className='charToggle' type='button' style={{left: '18.5em'}}
              onClick={() => this.toggleClass(1)}>
              <span> ▶</span>
            </button>

            <button className='charToggle' type='button' style={{left: '24em'}}
              onClick={() => this.toggleRace(-1)}>
              <span>◀ </span>
            </button>
            <div id='raceDisplay' value='playerRace'>{this.displayRace()}</div>
            <button className='charToggle' type='button' style={{left: '32.5em'}} onClick={() => this.toggleRace(1)}>
              <span> ▶</span>
            </button>
          </div>
          <br /><br />

          <label value='bio'>
            <h3 className='charHeader' id='bioHeader'>Biography</h3>
          </label><br />
          <textarea name='bio' id='characterDesc' />
          <br />

          <label value='playerClass'>
            <h3 className='charHeader' id='asHeader'>Ability Scores:</h3>
          </label><br />
          {
            this.state.abilityScores.map((ability, index) => {
              return (
                index === 3 ? <br key={index}/> :
                <div className='charDiv' id={ability.key} key={index}>{ability.key}:
                  <input className='charInput' id={ability.key} type='number'
                    name={ability.key} min='8' max='15' value={ability.value}
                    onChange={(e) => this.handleChange(e, ability)} />
                </div>
              )
            })
          }
          <br /><br />
          <button value='submit' id='characterSubmit'>Submit</button>
        </form>
      </Fragment>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addCharacter: (character) => {
      dispatch({ type: 'ADD_CHARACTER', payload: character })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewCharacterForm);
