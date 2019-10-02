import { combineReducers } from 'redux';
import sessionReducer from './session_reducer'; 
import errorReducer from './errors_reducer';

export default combineReducers({
  // Remove this later, because 
  session: sessionReducer,
  errors: errorReducer,
});


