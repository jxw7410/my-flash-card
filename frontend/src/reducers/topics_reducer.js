import {RECEIVE_TOPIC, RECEIVE_TOPICS, DELETE_TOPIC} from '../actions/topics_action';


/*
  Sample state:
  topicReducer : {
    id : {
      name: etc,
      type: etc,
      description: etc,
    }, ...
  }
*/
const topicsReducer = ( state = {}, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TOPIC:
      return Object.assign({}, state, action.topic);
    case DELETE_TOPIC:
      const newState = Object.assign({}, state);
      delete newState[action.topic.id]
      return newState;
    case RECEIVE_TOPICS:
      return action.topics;
    default:
      return state;
  }
}


export default topicsReducer;