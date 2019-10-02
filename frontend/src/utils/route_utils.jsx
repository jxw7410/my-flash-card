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

// May want a protected route as well to dry up code for paths that need authentication.

const msp = state  => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(msp)(Auth));




