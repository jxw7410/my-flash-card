import { connect } from 'react-redux';
import CreateQuestionModal from './question_modal';
import { closeModal } from '../../actions/modal_action';
import { createQuestion, editQuestion } from '../../actions/questions_action';

const msp = state => ({

})


const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createQuestion: data => dispatch(createQuestion(data)),
  editQuestion: data => dispatch(editQuestion(data)),
})


export default connect(msp, mdp)(CreateQuestionModal);