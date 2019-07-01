export default function userReducer(
  state = {
    currentCharacters: []
  },
  action
) {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {...state, currentCharacters: action.payload};
    case 'RESET_CHARACTERS':
      return {...state, currentCharacters: []}

    default:
      return state;
  }
};
