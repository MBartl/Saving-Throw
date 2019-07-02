import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

import { url } from '../route'
import { connect } from 'react-redux';

class NewCharacterForm extends Component {

  state = {
    lvl: 1,
    classIndex: 0,
    raceIndex: 0,
    subraceIndex: 0,
    class: 'Barbarian',
    subclass: 'Berserker',
    race: 'Dwarf',
    subraces: ['Hill Dwarf', 'Mountain Dwarf'],
    abilityScores: [{key: 'Strength', value: 8}, {key: 'Dexterity', value: 8},
    {key: 'Constitution', value: 8}, {}, {key: 'Intelligence', value: 8},
    {key: 'Wisdom', value: 8}, {key: 'Charisma', value: 8}],
    bonus: [0, 0, 2, 0, 1, 0],
    points: 27
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    const name = e.target.parentElement.name.value
    const biography = e.target.parentElement.biography.value
    const level = this.state.lvl
    const player_class = this.state.class
    const race = this.state.race
    const subclass = this.state.subclass
    const subrace = this.state.subraces[this.state.subraceIndex]
    const ability_score = this.state.abilityScores.filter(score => score.value).map((score, index) => score.value + this.state.bonus[index]).join(', ')

    const character = {character: {name, biography, level, player_class, race, subclass, subrace, ability_score}}

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
    .then(doc => {
      if (doc.errors) {
        alert(doc.errors)
      } else {
        this.props.addCharacter(doc.character)
        this.props.history.push(`/characters`)
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
    const subclasses = ['Berserker', 'Lore', 'Life', 'Land', 'Champion', 'Open Hand', 'Devotion', 'Hunter', 'Thief', 'Draconic', 'Fiend', 'Evocation']

    this.setState({
      class: this.displayClass(),
      subclass: subclasses[this.state.classIndex]
    })
  }

  displayClass = () => {
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']

    return classes[this.state.classIndex]
  }

  displaySubclass = () => {
    const subclasses = ['Berserker', 'Lore', 'Life', 'Land', 'Champion', 'Open Hand', 'Devotion', 'Hunter', 'Thief', 'Draconic', 'Fiend', 'Evocation']

    return subclasses[this.state.classIndex]
  }

  setRace = () => {
    this.setState({
      race: this.displayRace()
    }, () => this.setSubrace())
  }

  displayRace = () => {
    const races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];

    return races[this.state.raceIndex];
  }

  toggleRace = (increment) => {
    if (this.state.raceIndex < 1 && increment === -1) {
      this.setState({
        raceIndex: 8,
        subraceIndex: 0
      }, () => this.setRace(), () => this.setSubrace())
    } else if (this.state.raceIndex > 7 && increment === 1) {
      this.setState({
        raceIndex: 0,
        subraceIndex: 0
      }, () => this.setRace(), () => this.setSubrace())
    } else {
      this.setState({
        raceIndex: this.state.raceIndex+increment,
        subraceIndex: 0
      }, () => this.setRace(), () => this.setSubrace())
    }
  }

  setSubrace = () => {
    if (this.state.race === 'Dwarf') {
      this.setState({
        subraces: ['Hill Dwarf', 'Mountain Dwarf']
      }, () => this.getBonuses())
    }
    else if (this.state.race === 'Halfling') {
      this.setState({
        subraces: ['Lightfoot']
      }, () => this.getBonuses())
    }
    else if (this.state.race ===  'Elf') {
      this.setState({
        subraces: ['High Elf', 'Wood Elf', 'Dark Elf']
      }, () => this.getBonuses())
    }
    else {
      this.setState({
        subraces: []
      }, () => this.getBonuses())
    }
  }

  displaySubrace = () => {
    return this.state.subraces[this.state.subraceIndex]
  }

  toggleSubrace = (increment) => {
    if (this.state.subraceIndex < 1 && increment === -1) {
      this.setState({
        subraceIndex: this.state.subraces.length-1
      }, () => this.setRace(), () => this.setSubrace())
    } else if (this.state.subraceIndex > this.state.subraces.length-2
      && increment === 1) {
      this.setState({
        subraceIndex: 0
      }, () => this.setRace(), () => this.setSubrace())
    } else {
      this.setState({
        subraceIndex: this.state.subraceIndex+increment
      }, () => this.setRace(), () => this.setSubrace())
    }
  }

  getBonuses = () => {
    const raceBonuses = [
      {'Dwarf': [0, 0, 2, 0, 0, 0]},
      {'Elf': [0, 2, 0, 0, 0, 0]},
      {'Halfling': [0, 2, 0, 0, 0, 0]},
      {'Human': [1, 1, 1, 1, 1, 1]},
      {'Dragonborn': [2, 0, 0, 0, 0, 1]},
      {'Gnome': [0, 0, 0, 2, 0, 0]},
      {'Half-Elf': [0, 0, 0, 0, 0, 2]},
      {'Half-Orc': [2, 0, 1, 0, 0, 0]},
      {'Tiefling': [0, 0, 0, 1, 0, 2]}
    ]

    const subBonuses = [
      {'Hill Dwarf': [0, 0, 0, 0, 1, 0]},
      {'High Elf': [0, 0, 0, 1, 0, 0]},
      {'Lightfoot': [0, 0, 0, 0, 0, 1]},
      {'Mountain Dwarf': [2, 0, 0, 0, 0, 0]},
      {'Wood Elf': [0, 0, 0, 0, 1, 0]},
      {'Dark Elf': [0, 0, 0, 0, 0, 1]}
    ]

    const race = this.state.race
    const subrace = this.state.subraces[this.state.subraceIndex]

    let total
    const bonus = raceBonuses[raceBonuses.findIndex(r => Object.keys(r)[0] === race)]
    if (this.state.subraces.length > 0) {
      const sub = subBonuses[subBonuses.findIndex(s => Object.keys(s)[0] === subrace)]
      total = bonus[race].map((stat, index) => sub[subrace][index] > stat ? sub[subrace][index] : stat)
    } else {
      total = bonus[race]
    }

    this.setState({
      bonus: total
    })
  }

  handleChange = (e, ability) => {
    e.preventDefault()

    let index = this.state.abilityScores.findIndex(s => s.key === ability.key);
    let newValue = parseInt(e.target.value)
    let oldValue = this.state.abilityScores[index].value
    let singlePointChange;

    if (newValue > 999) {
      alert("Stop messing with my form please\nYou're going to break the 'points remaining' counter ¯\\_(ツ)_/¯")
    }

    if (isNaN(newValue)) {
      let scores = this.state.abilityScores;
      scores.splice(index, 1, {key: ability.key, value: ''})

      let multiPointChange = oldValue

      if (oldValue-13 > 0)
        {multiPointChange = multiPointChange+newValue-13}

      this.setState({
        abilityScores: [...scores],
        points: this.state.points+multiPointChange
      })
    } else {

    if (newValue+1 === oldValue ||
      newValue-1 === oldValue) {
        if (newValue > oldValue)
          {newValue > 13 ? singlePointChange = -2 : singlePointChange = -1}
        else
          {newValue > 12 ? singlePointChange = 2 : singlePointChange = 1}

        let scores = this.state.abilityScores;
        scores.splice(index, 1, {key: ability.key, value: newValue})

      this.setState({
        abilityScores: [...scores],
        points: this.state.points+singlePointChange
      })
    }

    else {
      let multiPointChange = oldValue - newValue

      if (newValue > oldValue && newValue-13 > 0)
        {multiPointChange = multiPointChange-(newValue-13)}

      else if (newValue < oldValue && oldValue-13 > 0)
        {multiPointChange = multiPointChange+oldValue-13}

      let scores = this.state.abilityScores;
      scores.splice(index, 1, {key: ability.key, value: newValue});

      this.setState({
        abilityScores: [...scores],
        points: this.state.points+multiPointChange
      })
    }}
  }

  handleLevel = (e) => {
    this.setState({
      lvl: e.target.value
    })
  }

  render() {
    const stats = ['STR+', 'DEX+', 'CON+', 'INT+', 'WIS+', 'CHA+']
    return (
      <Fragment>
        <Link to='characters'>
          <button id='characterBtn'>Back</button>
        </Link>
        <form id='characterForm'>
          <div id='charNameInput'>
            <img id='nameImg' src='charactersheet.png'
            alt='D&D character form name background' />
            <input name='name' id='charNameField' placeholder='Character Name' />
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
            <button className='charToggle' type='button' style={{left: '10.6em'}}
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

          <label value='playerClass'>
            <h3 className='charHeader' style={{marginLeft: '3em'}}>Subclass</h3>
          </label>
          <label value='playerRace' id='raceHeader'>
            <h3 className='charHeader' style={{marginLeft: '2.3em'}}>Subrace</h3>
          </label><br />

          <div>
            <div id='subclassDisplay' value='playerClass'>
              {this.displaySubclass()}</div>
            <div>
              {
                this.state.subraces.length !== 0 ?
                  <Fragment>
                    <button className='charToggle' type='button'
                      style={{left: '24em'}}
                      onClick={() => this.toggleSubrace(-1)}>
                      <span>◀ </span>
                    </button>
                    <div id='subraceDisplay' value='playerRace'>
                      {this.displaySubrace()}</div>
                    <button className='charToggle' type='button'
                      style={{left: '33em'}}
                      onClick={() => this.toggleSubrace(1)}>
                      <span> ▶</span>
                    </button>
                  </Fragment>
                : null
              }
            </div>
          </div>
          <br /><br />

          <label value='biography'>
            <h3 className='charHeader' id='bioHeader'>Biography</h3>
          </label><br />
          <textarea name='biography' id='characterDesc' />
          <br /><br />

          <label value='playerClass'>
            <h3 className='charHeader as'>Ability Scores:</h3>
            <h5 className='charHeader as bns'>Bonuses:
              {
                this.state.bonus.map((stat, index) => {
                  return (
                    stat > 0 ? <span key={index} className='ea bns'>
                      {stats[index] + stat}</span>
                    :
                    null
                  )
                })
              }
            </h5><br />
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
          <h5 className='charHeader' id='ptsRemain'>
            Points Remaining: {this.state.points}</h5>
          <button value='submit' id='characterSubmit' onClick={this.handleSubmit}>Next</button>
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
