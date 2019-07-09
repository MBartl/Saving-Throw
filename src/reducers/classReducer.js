export default function classReducer(
  state = {
    classes: ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
  },
  action
) {
  switch (action.type) {
    case 'SET_CLASS_DETAILS':
      return {...state, classes: action.payload};

    default:
      return state;
  };
};
