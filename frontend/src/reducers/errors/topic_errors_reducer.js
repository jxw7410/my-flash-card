import {RECEIVE_TOPIC, RECEIVE_TOPIC_ERRORS, CLEAR_TOPIC_ERRORS} from '../../actions/topics_action';


const topicErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TOPIC_ERRORS:
      return action.errors;
    case RECEIVE_TOPIC:
      return [];
    case CLEAR_TOPIC_ERRORS:
      return [];
    default: 
      return state;    
  }
}


export default topicErrorReducer;