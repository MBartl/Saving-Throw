import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = () => combineReducers({
  loading: loadingReducer,
  user: userReducer
});

export default rootReducer;
