import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import campaignReducer from './campaignReducer';
import characterReducer from './characterReducer';
import classReducer from './classReducer';
import raceReducer from './raceReducer';

const rootReducer = () => combineReducers({
  load: loadingReducer,
  user: userReducer,
  campaign: campaignReducer,
  character: characterReducer,
  class: classReducer,
  race: raceReducer
});

export default rootReducer;
