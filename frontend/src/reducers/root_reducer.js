import { combineReducers } from 'redux';
import sessionReducer from './session_reducer'; 
import topicReducer from './topics_reducer';
import errorReducer from './errors_reducer';
import uiReducer from './ui_reducer';
import questionReducer from './questions_reducer';

export default combineReducers({
  // Remove this later, because 
  session: sessionReducer,
  questions: questionReducer,
  topics: topicReducer,
  errors: errorReducer,
  ui: uiReducer
});


