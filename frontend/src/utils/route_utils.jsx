import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const Auth = ({ component: Component, exact, path, loggedIn }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      !loggedIn ?
        <Component {...props} /> : <Redirect to="/" />
    )}
  />
)


const Protected = ({ component: Component, exact, path, loggedIn}) => (
  <Route 
    path={path}
    exact={exact}
    render={props => (
      loggedIn ?
        <Component {...props} /> : <Redirect to="/login" />
    )} />
)

const msp = state  => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = connect(msp)(Auth);
export const ProtectedRoute = connect(msp)(Protected);



