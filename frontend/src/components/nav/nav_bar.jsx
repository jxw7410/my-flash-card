import React, {useState, useEffect, useRef} from 'react';
import Styles from './nav_bar.module.css';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const [state, setState] = useState({
    renderDropdown: false,
  });

  // We're using useEffect as componentDidUpdate to watch renderDropdown
  // Such that if there is a change, and the state is now true,
  // We want to focus on the dropdown.

  const dropDownRef = useRef();
  useEffect( () => {
    if (state.renderDropdown) dropDownRef.current.focus();
  }, [state.renderDropdown])

  const logout = e => {
    e.preventDefault();
    props.logout();
  }

  const renderDropdown = e => {
    e.preventDefault();
    const renderDropdown = !state.renderDropdown;
    setState({
      ...state,
      renderDropdown
    })
  }

  const authLinks = () => (
    <>
      <section className={Styles.authLinkCtn}>
        <Link className={Styles.authLink}to='/login'> Login </Link>
        <div className={Styles.authLinkExpander}/>
      </section>
      <section className={Styles.authLinkCtn}>
        <Link className={Styles.authLink} to="/register"> Sign Up </Link>
        <div className={Styles.authLinkExpander} />
      </section>
    </>
  )


  const dropDown = () => (
    <div
      style={ state.renderDropdown ? {display: "block"} : {}}
      onClick={e => e.stopPropagation()}
      className={Styles.userDropdown}>
      <ul>
        <li>
          <section>
            <div className={Styles.iconCtn}>
              <i className="fas fa-user" />
            </div>
          </section>
          <section>
            {props.user.username}
          </section>
        </li>
      </ul>
    </div>
  )


  const loggedInLinks = () => (
    <div className={Styles.loggedInLinks}>
      <section 
        ref={dropDownRef}
        tabIndex="0"
        onClick={renderDropdown}
        onBlur={() => setState({ ...state, renderDropdown: false })}
        className={Styles.username}>
        <div className={Styles.iconCtn}> 
          <i className="fas fa-user" />
        </div>
        { dropDown()}
      </section>
      <button 
        className={Styles.logoutBtn} 
        type='button' 
        onClick={logout}>Log Out</button>
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