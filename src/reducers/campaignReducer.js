import { RESET_CAMPAIGNS, CHANGE_NAV, SET_CAMPAIGNS, SET_CHARACTER_CAMPAIGNS, ADD_CAMPAIGN,  SET_DISCOVER, UPDATE_CAMPAIGN } from '../constants'

export default function userReducer(
  state = {
    nav: 'Home',
    campaigns: [],
    characterCampaigns: [],
    discover: []
  },
  action
) {
  switch (action.type) {
    case RESET_CAMPAIGNS:
      return {...state, nav: 'Home', campaigns: [], characterCampaigns: [], discover: []}
    case CHANGE_NAV:
      return {...state, nav: action.payload}
    case SET_CAMPAIGNS:
      return {...state, campaigns: action.payload};
    case SET_CHARACTER_CAMPAIGNS:
      return {...state, characterCampaigns: action.payload};
    case ADD_CAMPAIGN:
      return {...state, campaigns: [...state.campaigns, action.payload]}
    case SET_DISCOVER:
      return {...state, discover: action.payload};
    case UPDATE_CAMPAIGN:
      return {...state, characterCampaigns: [...state.characterCampaigns.map(c => c.id === action.payload.id ? action.payload : c)]};

    default:
      return state;
  };
};
