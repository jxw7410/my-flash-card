import React from 'react';
import Styles from './nav_bar.module.css';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <div className={Styles.mainCtn}>
        <section>
          <Link className={Styles.logo} to="/">MyFlashCards</Link>
        </section>
        <section>
          {
            props.isLoggedIn ? 
              <div>UserName</div> : AuthLinks()
          }
        </section>
    </div>
  )
}


const AuthLinks = () => (
  <>
    <Link className={Styles.authLink} to='#'> Login </Link>
    <Link className={Styles.authLink} to="#"> Sign Up </Link> 
  </>
)


export default NavBar;