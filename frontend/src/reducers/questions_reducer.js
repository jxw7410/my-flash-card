import {
  RECEIVE_QUESTION, 
  RECEIVE_QUESTIONS, 
  DELETE_QUESTION,
  DELETE_ALL_QUESTIONS
} from '../actions/questions_action';

/*
  state of question would be:
  { 
    id : {
      id,
      question,
      answer,
    }
  }
*/
const questionReducer = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_QUESTION:
      return Object.assign({}, state, action.question);
    case RECEIVE_QUESTIONS:
      return action.questions;
    case DELETE_QUESTION:
      const newState = Object.assign({}, state);
      delete newState[action.questionId]
      return newState;
    case DELETE_ALL_QUESTIONS:
      return {};
    default: 
      return state;
  }
}



export default questionReducer;