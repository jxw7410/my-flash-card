import {RECEIVE_CREATED_TOPIC, RECEIVE_USER_TOPICS} from '../actions/topics_action';


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
    case RECEIVE_CREATED_TOPIC:
      return Object.assign({}, state, action.topic);
    case RECEIVE_USER_TOPICS:
      return action.topics;
    default:
      return state;
  }
}


export default topicsReducer;