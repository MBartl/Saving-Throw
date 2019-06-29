export default function userReducer(
  state = {
    currentCharacters: null
  },
  action
) {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return {...state, currentCharacters: action.payload};

    default:
      return state;
  }
};
