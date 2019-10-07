import { combineReducers } from 'redux';
import sessionReducer from './session_reducer'; 
import topicReducer from './topics_reducer';
import errorReducer from './errors_reducer';

export default combineReducers({
  // Remove this later, because 
  session: sessionReducer,
  topics: topicReducer,
  errors: errorReducer,
});


