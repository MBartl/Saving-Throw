export default function loadingReducer(
  state = {
    loading: true,
    campaignLoading: false,
    characterLoading: false
  },
  action
) {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: !state.loading};
    case 'CAMPAIGN_LOADING':
      return {...state, campaignLoading: !state.campaignLoading};
    case 'CHARACTER_LOADING':
      return {...state, characterLoading: !state.characterLoading};
    default:
      return state;
  }
};
