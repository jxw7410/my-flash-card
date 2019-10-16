import React from 'react';
import { connect } from 'react-redux';
import UserPage from './user_page_container';
import SplashPage from './splash_page';
import { Route } from 'react-router-dom';

const MainPage = ({isLoggedIn, exact, path}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      isLoggedIn ? 
        <UserPage {...props} /> : <SplashPage {...props} />
    )}
  />
)



const msp = state => ({
  isLoggedIn: state.session.isAuthenticated
})



export default connect(msp)(MainPage)