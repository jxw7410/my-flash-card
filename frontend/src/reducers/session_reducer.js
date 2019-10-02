import {RECEIVE_CURRENT_USER, LOGOUT_USER} from '../actions/session_action'
const defaultState = {
  isAuthenticated: false, 
  user: {}
}

const sessionReducer = ( state = defaultState, action) => {
  Object.freeze(state);
  
  switch( action.type ){
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.user
      }
    case LOGOUT_USER:
      return defaultState;
    default: 
      return state;
  }
}


export default sessionReducer;