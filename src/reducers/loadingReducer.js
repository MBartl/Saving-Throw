export default function loadingReducer(
  state = {
    loading: true,
    characterLoading: true,
    campaignLoading: true,
    discoverLoad: true
  },
  action
) {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: false};
    case 'CAMPAIGN_LOADING':
      return {...state, campaignLoading: false};
    case 'CHARACTER_LOADING':
      return {...state, characterLoading: false};
    case 'DISCOVER_LOADING':
      return {...state, discoverLoad: false}
    case 'RESET_LOADINGS':
      return {...state, loading: true, characterLoading: true, campaignLoading: true, discoverLoad: true}
    default:
      return state;
  };
};
