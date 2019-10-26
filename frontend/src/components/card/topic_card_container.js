import { connect } from 'react-redux';
import TopicCard from './topic_card';
import { openModal } from '../../actions/modal_action';
import { deleteTopic } from '../../actions/topics_action';

const mdp = dispatch => ({
  openModal: modalData => dispatch(openModal(modalData)),
  deleteTopic: data => dispatch(deleteTopic(data))
})



export default connect(null, mdp)(TopicCard);

