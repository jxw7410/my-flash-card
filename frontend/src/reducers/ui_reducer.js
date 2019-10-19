import { combineReducers } from 'redux';
import modalReducer from './ui/modal_reducer';

export default combineReducers({
  modalData: modalReducer
})

