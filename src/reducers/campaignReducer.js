export default function userReducer(
  state = {
    campaigns: [],
    characterCampaigns: [],
    discover: []
  },
  action
) {
  switch (action.type) {
    case 'RESET_CAMPAIGNS':
    return {...state, campaigns: [], characterCampaigns: [], discover: []}
    case 'SET_CAMPAIGNS':
      return {...state, campaigns: action.payload};
    case 'SET_CHARACTER_CAMPAIGNS':
      return {...state, characterCampaigns: action.payload};
    case 'ADD_CAMPAIGN':
      return {...state, campaigns: [...state.campaigns, action.payload]}
    case 'SET_DISCOVER':
      return {...state, discover: action.payload};

    default:
      return state;
  }
};
