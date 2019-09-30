import React from 'react';
import { connect } from 'react-redux';
import UserPage from './user_page';
import SplashPage from './splash_page';

const MainPage = ({ isLoggedIn }) => {
  return (
    <>
      {
        isLoggedIn ? <UserPage /> : <SplashPage />
      }
    </>
  )
}



const msp = state => ({
  isLoggedIn: state.session.isAuthenticated
})



export default connect(msp)(MainPage)