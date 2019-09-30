import * as SessionApi from '../utils/session_api';

const LOGOUT_USER = 'LOGOUT_USER';


const logOutUserAction = {
  type: LOGOUT_USER
}

export const logOutUser = () => dispatch => {
  localStorage.removeItem('jwt');
  SessionApi.setAuthToken(null);
  dispatch(logOutUserAction());
}