import { connect } from 'react-redux';
import { registerUser, clearSessionErrorsAction } from '../../actions/session_action';
import Register from './register';



const msp = state => ({
  errors: state.errors.session,
});


const mdp = dispatch => ({
  registerUser: userData => dispatch( registerUser(userData)),
  clearErrors: () => dispatch(clearSessionErrorsAction),
});

export default connect(msp, mdp)(Register);