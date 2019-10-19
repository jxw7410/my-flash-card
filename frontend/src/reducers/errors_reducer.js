import { combineReducers } from 'redux';
import sessionErrorReducer from './errors/session_errors_reducer';
import topicErrorReducer from './errors/topic_errors_reducer';
import questionErrorReducer from './errors/question_errors_reducer';

export default combineReducers({
  session: sessionErrorReducer,
  topic: topicErrorReducer,
  question: questionErrorReducer
})