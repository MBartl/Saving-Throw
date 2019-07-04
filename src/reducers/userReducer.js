export default function userReducer(
  state = {
    currentUser: null
  },
  action
) {
  switch (action.type) {
    case 'LOG_IN':
      return {...state, currentUser: action.payload};
    case 'LOG_OUT':
      return {...state, currentUser: null};

    default:
      return state;
  };
};
