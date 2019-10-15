import { connect } from 'react-redux';
import TopicCard from './topic_card';
import { openModal } from '../../actions/modal_action';


const mdp = dispatch => ({
  openModal: modalData => dispatch(openModal(modalData))
})



export default connect(null, mdp)(TopicCard);

