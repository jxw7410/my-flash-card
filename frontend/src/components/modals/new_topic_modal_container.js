import { connect } from 'react-redux';
import NewTopicModal from './new_topic_modal';
import { createNewTopic } from '../../actions/topics_action';
import { closeModal } from '../../actions/modal_action';

const msp = state => ({

})

const mdp = dispatch => ({
  createNewTopic: data => dispatch(createNewTopic(data)),
  closeModal: () => dispatch( closeModal())
})

export default connect(msp, mdp)(NewTopicModal);


