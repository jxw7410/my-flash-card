import * as SessionApi from '../utils/session_api';
import jwt_decode from 'jwt-decode';

export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'; 
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const logOutUserAction = {
  type: LOGOUT_USER
}

const receiveCurrentUserAction = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const receiveSessionErrorsAction = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

const clearSessionErrorsAction = {
  type: CLEAR_SESSION_ERRORS
}


export const registerUser = userData =>  dispatch => {
  return SessionApi.registerUser(userData)
    .then( res => {
      authenticateUser(res, dispatch);
    })
    .catch(({ response }) => {
      dispatch(receiveSessionErrorsAction(response.data));
    });
}

export const loginUser = userData => dispatch => {
  return SessionApi.loginUser(userData)
    .then(res => {
      authenticateUser(res, dispatch);
    })
    .catch(({response}) => {
      dispatch(receiveSessionErrorsAction(response.data));
    });
}

export const logOutUser = () => dispatch => {
  localStorage.removeItem('jwt');
  SessionApi.setAuthToken(null);
  dispatch(logOutUserAction());
}


// Helper methods for Session Action

const authenticateUser = (response, dispatch) => {
  const { token } = response.data;
  localStorage.setItem('jwt', token);
  SessionApi.setAuthToken(token);
  const decodedUser = jwt_decode(token);
  dispatch(receiveCurrentUserAction(decodedUser))
}


