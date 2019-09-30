import React from 'react';
import ReactDom from 'react-dom';
import Root from './components/root';
import ReduxStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/session_api';
import { logOutUser } from './actions/session_action';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwt) {
    // Set authtoken, and decode it
    // This will be required to use jwt auth paths
    setAuthToken(localStorage.jwt);
    const decodedUser = jwt_decode(localStorage.jwt)
    
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    }
    store = ReduxStore( preloadedState );
    if (decodedUser.exp < (Date.now() / 1000)){
      store.dispatch(logOutUser());
      window.location.href = '/#/login'
    }

  } else {
    store = ReduxStore();
  }

  ReactDom.render(<Root store={store} />, document.getElementById('root'));
  //For debugger 
  window.getState = store.getState; 
});