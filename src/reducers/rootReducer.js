import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import campaignReducer from './campaignReducer';
import characterReducer from './characterReducer';

const rootReducer = () => combineReducers({
  load: loadingReducer,
  user: userReducer,
  chat: chatReducer,
  campaign: campaignReducer,
  character: characterReducer,
});

export default rootReducer;
