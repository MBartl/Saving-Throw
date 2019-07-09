export default function raceReducer(
  state = {
    races: ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"]
  },
  action
) {
  switch (action.type) {
    case 'SET_RACE_DETAILS':
      return {...state, races: action.payload};

    default:
      return state;
  };
};
