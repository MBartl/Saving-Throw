import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import campaignReducer from './campaignReducer';
import characterReducer from './characterReducer';

const rootReducer = () => combineReducers({
  loading: loadingReducer,
  user: userReducer,
  campaigns: campaignReducer,
  characters: characterReducer
});

export default rootReducer;
