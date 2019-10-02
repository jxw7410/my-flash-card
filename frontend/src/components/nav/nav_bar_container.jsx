import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logOutUser } from '../../actions/session_action';



const msp = state => ({
  isLoggedIn: state.session.isAuthenticated
})

const mdp = dispatch => ({
  logout: () => dispatch(logOutUser())
})

export default connect(msp, mdp)(NavBar);