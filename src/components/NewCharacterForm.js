import React, { Component, Fragment } from 'react';

import { URL, HEADERS, ADD_CHARACTER } from '../constants'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class NewCharacterForm extends Component {

  // Local state to set up character
  state = {
    lvl: 1,
    classIndex: 0,
    raceIndex: 0,
    subraceIndex: 0,
    subraces: ['Hill Dwarf', 'Mountain'],
    abilityScores: [{key: 'Strength', value: 8}, {key: 'Dexterity', value: 8},
    {key: 'Constitution', value: 10}, {}, {key: 'Intelligence', value: 8},
    {key: 'Wisdom', value: 9}, {key: 'Charisma', value: 8}],
    bonus: [0, 0, 2, null, 0, 1, 0],
    max: [15, 15, 17, null, 15, 16, 15],
    min: [8, 8, 10, null, 8, 9, 8],
    points: 27,
    pointMode: 'Points'
  };

  componentDidMount() {
    this.props.setCharacters()
  }

  // On form submit send character to backend
  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const currentRace = this.displayRace(this.state.raceIndex);
    const subraceText = this.displaySubrace(this.state.subraceIndex);
    let currentSubrace;
    debugger
    if (subraceText.split(' ')[1].length > 2) {
      currentSubrace = subraceText.split(' ')[1] + ' ' + currentRace
    };
    if (currentSubrace === 'Dark Elf') {currentSubrace = 'Dark Elf (Drow)'};

    const name = e.target.parentElement.name.value;
    const biography = e.target.parentElement.biography.value;
    const level = this.state.lvl;
    const player_class = this.displayClass(this.state.classIndex);
    const race = this.displayRace(this.state.raceIndex);
    let subclass = this.displaySubclass(this.state.classIndex);
    const subrace = currentSubrace;
    const ability_score = this.state.abilityScores.filter(score => score.value).map((score, index) => score.value).join(', ');

    const character = {character: {name, biography, level, player_class, race, subclass, subrace, ability_score}};

    fetch(URL + 'characters', {
      method: 'POST',
      headers: {
        'Authorization': token,
        HEADERS
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
    });
  };

  // Class options
  toggleClass = (increment) => {
    let classIndex;

    if (this.state.classIndex < 1 && increment === -1) {
      classIndex = 11
    }
    else if (this.state.classIndex > 10 && increment === 1) {
      classIndex = 0
    }
    else {
      classIndex = this.state.classIndex+increment
    };

    this.setClass(classIndex);
  };

  setClass = (classIndex) => {
    this.setState({
      classIndex: classIndex,
      class: this.displayClass(classIndex)
    });
  };

  displayClass = (classIndex) => {
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

    return classes[classIndex];
  };

  // Subclass Options
  displaySubclass = () => {
    const subclasses = ['Berserker', 'Lore', 'Life', 'Land', 'Champion', 'Open Hand', 'Devotion', 'Hunter', 'Thief', 'Draconic', 'Fiend', 'Evocation'];

    return subclasses[this.state.classIndex];
  };

  // Race options
  toggleRace = (increment) => {
    let raceIndex;

    if (this.state.raceIndex < 1 && increment === -1) {
      raceIndex = 8
    }
    else if (this.state.raceIndex > 7 && increment === 1) {
      raceIndex = 0
    } else {
      raceIndex = this.state.raceIndex+increment
    };

    this.setRace(raceIndex);
  };

  setRace = (raceIndex) => {
    this.setState({
      raceIndex: raceIndex,
      subraceIndex: 0
    }, () => this.findSubraces(raceIndex));
  };

  displayRace = (raceIndex) => {
    const races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];

    return races[raceIndex];
  };

  // Subrace options
  findSubraces = (raceIndex) => {
    let subraces;

    if (this.state.raceIndex === 0) {
      subraces = ['Hill Dwarf', 'Mountain']
    }
    else if (this.state.raceIndex ===  1) {
      subraces = ['High Elf', 'Wood Elf', 'Dark Elf']
    }
    else if (this.state.raceIndex === 2) {
      subraces = ['Lightfoot']
    }
    else {
      subraces = []
    };

    this.setSubraces(subraces, raceIndex);
  };

  setSubraces = (subraces, raceIndex) => {
    this.setState({
      subraces: subraces
    }, () => this.applyBonuses(raceIndex));
  };

  displaySubrace = () => {
    return this.state.subraces[this.state.subraceIndex];
  };

  toggleSubrace = (increment) => {
    let subraceIndex = this.state.subraceIndex;
    const length = this.state.subraces.length-1;

    if (subraceIndex < 1 && increment === -1) {
      subraceIndex = length
    }
    else if (subraceIndex === length && increment === 1) {
      subraceIndex = 0
    } else {
      subraceIndex = this.state.subraceIndex+increment
    };

    this.setState({
      subraceIndex: subraceIndex
    }, () => this.applyBonuses(subraceIndex));
  };

  returnSubrace = (subraceIndex) => {
    return this.state.subraces[subraceIndex];
  };

  // Race and subrace bonuses
  getRaceBonuses = (raceIndex) => {
    const raceBonuses = [
      [0, 0, 2, null, 0, 0, 0],
      [0, 2, 0, null, 0, 0, 0],
      [0, 2, 0, null, 0, 0, 0],
      [1, 1, 1, null, 1, 1, 1],
      [2, 0, 0, null, 0, 0, 1],
      [0, 0, 0, null, 2, 0, 0],
      [0, 0, 0, null, 0, 0, 2],
      [2, 0, 1, null, 0, 0, 0],
      [0, 0, 0, null, 1, 0, 2]
    ];

    let index;
    if (typeof raceIndex !== 'undefined' &&
    raceIndex !== this.state.raceIndex) {
      index = this.state.raceIndex
    }
    else {
      index = this.state.raceIndex
    };

    return raceBonuses[index];
  };

  getSubraceBonus = (subraceIndex) => {
    const subrace = this.displaySubrace(this.state.subraceIndex);
    const subBonuses = [
      {'Hill Dwarf': [0, 0, 0, null, 0, 1, 0]},
      {'Mountain': [2, 0, 0, null, 0, 0, 0]},
      {'High Elf': [0, 0, 0, null, 1, 0, 0]},
      {'Wood Elf': [0, 0, 0, null, 0, 0, 1]},
      {'Dark Elf': [0, 0, 0, null, 0, 1, 0]},
      {'Lightfoot': [0, 0, 0, null, 0, 0, 1]}
    ];

    let index = subBonuses.findIndex(s => Object.keys(s)[0] === subrace);

    return subBonuses[index][subrace];
  };

  // Combine race and subrace bonuses
  combinedBonus = (index) => {
    let raceBonus = this.getRaceBonuses(this.state.raceIndex);
    let subraceBonus;
    if (this.state.subraces.length > 0) {
      subraceBonus = this.getSubraceBonus(this.state.subraceIndex);
    };

    if (typeof index !== 'undefined' && index !== this.state.raceIndex) {
      raceBonus = this.getRaceBonuses(index)
    }
    else if (typeof index !== 'undefined' && index !== this.state.subraceIndex &&
      this.state.subraces.length > 0) {
      subraceBonus = this.getSubraceBonus(index)
    };

    let total;
    if (this.state.subraces.length > 0) {
      total = subraceBonus.map((bonus, i) => {
        return (i === 3 ? null : bonus > raceBonus[i] ? bonus : raceBonus[i])
      });
      return total;
    } else {
      return raceBonus;
    };
  };

  applyBonuses = (index) => {
    const bonus = this.combinedBonus(index);

    const max = this.state.max.map((s, i) => s !== null ? 15+bonus[i] : null);
    const min = this.state.min.map((s, i) => s !== null ? 8+bonus[i] : null);

    const abilityScore = this.state.abilityScores.map((score, index) => {
      return (
        {key: score.key, value: score.value+bonus[index]-this.state.bonus[index]}
      );
    });

    this.adjustPoints(max, abilityScore);

    this.setState({
      abilityScores: abilityScore,
      bonus: bonus,
      max: max,
      min: min
    });
  };

  // Ability score functions
  renderAbilityScore = (index) => {
    return this.state.abilityScores[index] + this.state.bonus[index];
  };

  handleAbilityScoreChange = (e, ability) => {
    const index = this.state.abilityScores.findIndex(s => s.key === ability.key);
    let newValue = parseInt(e.target.value);
    const oldValue = this.state.abilityScores[index].value;

    if (newValue > 999) {
      alert("You can't go that high!");
      return;
    };

    if (isNaN(newValue) || e.target.value === '') {
      newValue = '';
    };

    this.changeScore(ability, index, newValue, oldValue);
  };

  changeScore(ability, index, newValue, oldValue) {
    let ptChange;

    if (newValue+1 === oldValue || newValue-1 === oldValue) {
      if (newValue > oldValue) {newValue > 13 ? ptChange = -2 : ptChange = -1}
      else {newValue > 12 ? ptChange = 2 : ptChange = 1};

      if (this.state.pointMode === 'Points' && this.state.points+ptChange < 0) {
        alert('Not enough points');
        return;
      };

      let scores = this.state.abilityScores;
      scores.splice(index, 1, {key: ability.key, value: newValue});

      this.setState({
        abilityScores: [...scores],
        points: this.state.points+ptChange
      });
    }

    else {
      ptChange = oldValue - newValue;

      if (newValue > oldValue && newValue-13 > 0) {ptChange = ptChange-(newValue-13)}
      else if (newValue < oldValue && oldValue-13 > 0) {ptChange = ptChange+oldValue-13};

      if (this.state.pointMode === 'Points' && this.state.points+ptChange < 0) {
        alert('Not enough points');
        return;
      };

      let scores = this.state.abilityScores;
      scores.splice(index, 1, {key: ability.key, value: newValue});

      this.setState({
        abilityScores: [...scores],
        points: this.state.points+ptChange
      });
    };
  };

  // Adjust point buy points when changing race or subrace
  adjustPoints(max, abilityScore) {
    let pointAdj = 0;

    const oldScores = this.state.abilityScores.map(ea => ea.value);
    const newScores = abilityScore.map(s => s.value);
    oldScores.forEach((s, i) => s > max[i] ? pointAdj = pointAdj+((s-max[i])) : null);

    oldScores.forEach((s, i) => {
      return (
        newScores[i] > oldScores[i] && newScores[i] > 13 ?
        pointAdj = pointAdj-(newScores[i]-oldScores[i]) : null
      );
    });

    debugger
    this.setState({
      points: this.state.points+pointAdj
    });
  };

  // Allow number input only
  checkKeyPress = (e, ability) => {
    if (e.charCode === 13) {
      e.preventDefault()
    }
    else if (e.charCode > 47 && e.charCode < 58) (
      this.handleAbilityScoreChange(e, ability)
    );
  };

  // Handle character levels 1-20
  handleLevel = (e) => {
    if (e.target.value > 20) {
      alert('Max is 20');
      return;
    };

    this.setState({
      lvl: e.target.value
    });
  };

  // Handle stat point modes
  pointMode = (e) => {
    e.preventDefault();

    if (e.target.innerHTML === 'Random') {
      this.randomizeScore();
    };

    this.setState({
      pointMode: e.target.innerHTML
    });
  };

  randomizeScore = () => {
    let points = 27;
    const bonus = this.combinedBonus()
    let newPoints = [8, 8, 8, null, 8, 8, 8].map((s, i) => i !== 3 ? s+bonus[i] : null);

    // Simulate point buy
    while (points > 0) {
      let stat = Math.floor(Math.random()*6);
      if (stat > 2) {stat++};
      if (newPoints[stat] > 13 && points === 1) {
        stat === 0 ? stat++ : stat--
        if (stat === 2) (stat--)
      }
      // Prevent random stats from exceeding maximum
      if (newPoints[stat]+1 > this.state.max[stat]) {
        stat = this.rerollStat(stat)
      };
      // Give preference to maxing stats
      if (newPoints[stat] === 8 && Math.floor(Math.random()*2) === 0) {
        stat = this.rerollStat(stat)
      };

      newPoints[stat]++;
      // Adjust points

      points--;
      if (newPoints[stat] > 13) {points--};
    };

    // Set the state
    this.setState({
      abilityScores: newPoints.map((s, i) => {
        return ({key: this.state.abilityScores[i].key, value: newPoints[i]});
      }),
      points: 0
    });
  }

  rerollStat = (stat) => {
    const oldStat = stat
    while (oldStat === stat) {
      stat = Math.floor(Math.random()*6);
    }
    if (stat > 2) (stat++)
    return stat
  }

  render() {
    const stats = ['STR+', 'DEX+', 'CON+', null, 'INT+', 'WIS+', 'CHA+'];
    return (
      <Fragment>
        <Link to='characters'>
          <button id='characterBack'>Back</button>
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

          <label value='biography'>
            <h3 className='charHeader' id='bioHeader'>Biography</h3>
          </label><br />
          <textarea name='biography' id='characterDesc' />
          <br />

          <div id='toggleContainer'>
            <label value='playerClass'>
              <h3 className='charHeader'>Class</h3>
            </label>
            <label value='playerRace' id='raceHeader'>
              <h3 className='charHeader' style={{marginLeft: '10.85em'}}>Race</h3>
            </label><br />

            <div>
              <button className='charToggle' type='button' style={{left: '12em'}}
                onClick={() => this.toggleClass(-1)}>
                <span>◀ </span>
              </button>
              <div id='classDisplay' value='playerClass'>
                {this.displayClass(this.state.classIndex)}
              </div>
              <button className='charToggle' type='button' style={{left: '20em'}}
                onClick={() => this.toggleClass(1)}>
                <span> ▶</span>
              </button>

              <button className='charToggle' type='button' style={{left: '25.8em'}}
                onClick={() => this.toggleRace(-1)}>
                <span>◀ </span>
              </button>
              <div id='raceDisplay' value='playerRace'>{this.displayRace(this.state.raceIndex)}</div>
              <button className='charToggle' type='button' style={{left: '34.2em'}} onClick={() => this.toggleRace(1)}>
                <span> ▶</span>
              </button>
            </div>
            <br /><br />

            <label value='playerClass'>
              <h3 className='charSubheader' style={{marginLeft: '3em'}}>Subclass</h3>
            </label>
            {
              this.state.subraces.length > 0 ?
                <label value='playerRace' id='raceHeader'>
                  <h3 className='charSubheader' style={{marginLeft: '10em'}}>Subrace</h3>
                  <br />
                </label>
              :
              null
            }

            <div>
              <div id='subclassDisplay' value='playerClass'>
                {this.displaySubclass()}</div>
              <div>
                {
                  this.state.subraces.length !== 0 ?
                    <Fragment>
                      <button className='charToggle sub' type='button'
                        style={{left: '25.8em'}}
                        onClick={() => this.toggleSubrace(-1)}>
                        <span>◀ </span>
                      </button>
                      <div id='subraceDisplay' value='playerRace'>
                        {this.displaySubrace()}</div>
                      <button className='charToggle sub' type='button'
                        style={{left: '34.2em'}}
                        onClick={() => this.toggleSubrace(1)}>
                        <span> ▶</span>
                      </button>
                    </Fragment>
                  : <div>---</div>
                }
              </div>
            </div>
          </div>
          <br /><br />
          <label value='playerClass'>
            <h3 className='charHeader as'>Ability Scores:</h3>
            <h5 className='charHeader as bns'>Bonuses:
              {
                this.displayRace(this.state.raceIndex) === 'Human' ?
                  <span className='ea bns'>ALL+1</span> :
                  this.state.bonus.map((stat, index) => {
                    return (
                      index === 3 ? null :
                      stat > 0 ? <span key={index} className='ea bns'>
                        {stats[index] + stat}</span>
                      :
                    null);
                  })
              }
            </h5>
          </label><br />
          <div id='asContainer'>
            {
              this.state.abilityScores.map((ability, index) => {
                return (
                  index === 3 ? <br key={index}/> :
                  <div className='charDiv' id={ability.key} key={index}>
                    {ability.key}:
                    <input className='charInput' id={ability.key} type='number'
                      name={ability.key} min={this.state.min[index]} max={this.state.max[index]}
                      value={ability.value}
                      onChange={(e) => this.handleAbilityScoreChange(e, ability)}
                      onKeyPress={(e) => this.checkKeyPress(e, ability)}
                    />
                  </div>
                );
              })
            }
          </div>
          <br /><br />
          {
            this.state.pointMode === 'Points' ?
              <h5 id='ptsRemain'>Points Remaining: {this.state.points}</h5>
            :
            null
          }
          <button onClick={this.pointMode} className={this.state.pointMode === 'Manual' ? 'ptsMode selected' : 'ptsMode'} id='left'>Manual</button>
          <button onClick={this.pointMode} className={this.state.pointMode === 'Random' ? 'ptsMode selected' : 'ptsMode'}>Random</button>
          <button onClick={this.pointMode} className={this.state.pointMode === 'Points' ? 'ptsMode selected' : 'ptsMode'}>Points</button>
          <button value='submit' id='characterSubmit' onClick={this.handleSubmit}>Next</button>
        </form>
      </Fragment>
    );
  };

};

const mapDispatchToProps = dispatch => {
  return {
    addCharacter: (character) => {
      dispatch({ type: ADD_CHARACTER, payload: character })
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewCharacterForm);
