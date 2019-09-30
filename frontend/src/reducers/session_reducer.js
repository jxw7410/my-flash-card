


const defaultState = {
  isAuthenticated: false, 
  user: {}
}

const sessionReducer = ( state = defaultState, action) => {
  Object.freeze(state);
  
  switch( action.type ){
    default: 
      return state;
  }
}


export default sessionReducer;