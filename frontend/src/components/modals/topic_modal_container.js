import { connect } from 'react-redux';
import NewTopicModal from './topic_modal';
import { createNewTopic, clearTopicErrors, editTopic } from '../../actions/topics_action';
import { closeModal } from '../../actions/modal_action';

const msp = state => ({
  errors: state.errors.topic
})

const mdp = dispatch => ({
  createNewTopic: data => dispatch(createNewTopic(data)),
  editTopic: data => dispatch(editTopic(data)),
  closeModal: () => dispatch( closeModal()),
  clearErrors: () => dispatch( clearTopicErrors() )
})

export default connect(msp, mdp)(NewTopicModal);


