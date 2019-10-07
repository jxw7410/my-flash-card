import { combineReducers } from 'redux';
import sessionErrorReducer from './errors/session_errors_reducer';

export default combineReducers({
  session: sessionErrorReducer,
})