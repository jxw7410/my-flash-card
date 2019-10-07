import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';


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

const msp = state  => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(msp)(Auth));




