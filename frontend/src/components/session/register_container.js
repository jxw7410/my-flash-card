import { connect } from 'react-redux';
import { registerUser } from '../../actions/session_action';
import Register from './register';



const msp = state => ({
  errors: state.errors.session,
});


const mdp = dispatch => ({
  registerUser: userData => dispatch( registerUser(userData)),
});

export default connect(msp, mdp)(Register);