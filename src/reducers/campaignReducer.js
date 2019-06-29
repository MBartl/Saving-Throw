export default function userReducer(
  state = {
    currentCampaigns: [],
    currentCharacterCampaigns: []
  },
  action
) {
  switch (action.type) {
    case 'SET_CAMPAIGNS':
      return {...state, currentCampaigns: action.payload};
    case 'SET_CHARACTER_CAMPAINS':
      return {...state, currentCharacterCampaigns: action.payload};

    default:
      return state;
  }
};
