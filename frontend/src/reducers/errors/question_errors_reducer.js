import {
  RECEIVE_QUESTIONS_ERRORS,
  CLEAR_QUESTIONS_ERRORS,
  RECEIVE_QUESTION
} from '../../actions/questions_action';



const questionErrorReducer = ( state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_QUESTIONS_ERRORS:
      return action.errors;
    case RECEIVE_QUESTION:
      return [];
    case CLEAR_QUESTIONS_ERRORS:
      return [];
    default:
      return state;
  }
}


export default questionErrorReducer;

