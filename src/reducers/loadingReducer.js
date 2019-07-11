import { LOADING, CAMPAIGN_LOADING, CHARACTER_LOADING, CHAR_SHOW_LOADING, DISCOVER_LOADING, RESET_LOADINGS } from '../constants'

export default function loadingReducer(
  state = {
    loading: true,
    characterLoading: true,
    campaignLoading: true,
    discoverLoad: true,
    charShowLoad: true
  },
  action
) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: false};
    case CAMPAIGN_LOADING:
      return {...state, campaignLoading: false};
    case CHARACTER_LOADING:
      return {...state, characterLoading: false};
    case CHAR_SHOW_LOADING:
      return {...state, charShowLoad: false}
    case DISCOVER_LOADING:
      return {...state, discoverLoad: false}
    case RESET_LOADINGS:
      return {...state, characterLoading: true, campaignLoading: true, discoverLoad: true}
    default:
      return state;
  };
};
