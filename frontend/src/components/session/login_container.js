import { connect } from 'react-redux';
import { loginUser } from '../../actions/session_action';
import Login from './login';

const msp = state => ({
  errors: state.errors.session
})


const mdp = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
})

export default connect(msp, mdp)(Login);


