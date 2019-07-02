export default function userReducer(
  state = {
    characters: []
  },
  action
) {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {...state, characters: action.payload};
    case 'ADD_CHARACTER':
      return {...state, characters: [...state.characters, action.payload]}
    case 'RESET_CHARACTERS':
      return {...state, characters: []}

    default:
      return state;
  }
};
