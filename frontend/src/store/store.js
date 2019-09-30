import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from '../reducers/root_reducer';


const ReduxStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
)

export default ReduxStore;