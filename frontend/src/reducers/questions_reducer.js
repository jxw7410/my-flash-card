import {
  RECEIVE_QUESTION, 
  RECEIVE_QUESTIONS, 
  DELETE_QUESTION,
  DELETE_ALL_QUESTIONS,
  RECEIVE_COUNT
} from '../actions/questions_action';


const initialState = ({
  count: 0,
  questions: {}
})

const questionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_QUESTION:
      newState.questions = Object.assign({}, newState.questions, action.question);
      newState.count += 1;
      return newState;
    case RECEIVE_QUESTIONS:
      newState.questions = action.questions;
      return newState;
    case DELETE_QUESTION:
      delete newState.questions[action.questionId]
      newState.count -= 1;
      return newState;
    case RECEIVE_COUNT:
      newState.count = action.count;
      return newState;
    case DELETE_ALL_QUESTIONS:
      return initialState;
    default: 
      return state;
  }
}



export default questionReducer;