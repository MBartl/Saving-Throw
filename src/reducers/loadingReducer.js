export default function loadingReducer(
  state = {
    loading: true,
    campaignLoading: false
  },
  action
) {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: !state.loading};
    case 'CAMPAIGN_LOADING':
      return {...state, campaignLoading: !state.campaignLoading};
    default:
      return state;
  }
};
