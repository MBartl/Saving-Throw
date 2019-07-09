export default function userReducer(
  state = {
    characters: [],
    freeCharacters: []
  },
  action
) {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {...state, characters: action.payload};
    case 'SET_FREE_CHARACTERS':
      return {...state, freeCharacters: action.payload};
    case 'ADD_CHARACTER':
      return {...state, characters: [...state.characters, action.payload]};
    case 'RESET_CHARACTERS':
      return {...state, characters: []};

    default:
      return state;
  };
};
