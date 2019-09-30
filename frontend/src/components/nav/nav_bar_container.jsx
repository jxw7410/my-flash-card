import { connect } from 'react-redux';
import NavBar from './nav_bar';



const msp = state => ({
  isLoggedIn: state.session.isAuthenticated
})

export default connect(msp)(NavBar);