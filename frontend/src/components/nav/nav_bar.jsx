import React from 'react';
import Styles from './nav_bar.module.css';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const logout = e => {
    e.preventDefault();
    props.logout();
  }

  const authLinks = () => (
    <>
      <Link className={Styles.authLink} to='/login'> Login </Link>
      <Link className={Styles.authLink} to="/register"> Sign Up </Link>
    </>
  )

  const loggedInLinks = () => (
    <div className={Styles.loggedInLinks}>
      <section className={Styles.username}>{props.user.username}</section>
      <button className={Styles.logoutBtn} type='button' onClick={logout}>Log Out</button>
    </div>
  )

  return (
    <div className={Styles.mainCtn}>
        <section>
          <Link className={Styles.logo} to="/">MyFlashCards</Link>
        </section>
        <section>
          {
            props.isLoggedIn ? 
             loggedInLinks() : authLinks()
          }
        </section>
    </div>
  )
}




export default NavBar;