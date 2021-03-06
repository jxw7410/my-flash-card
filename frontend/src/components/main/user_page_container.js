import { connect } from 'react-redux';
import UserPage from './user_page';
import { createNewTopic, fetchUserTopics } from '../../actions/topics_action';
import { openModal} from '../../actions/modal_action';



const msp  = state =>  ({
  topics: state.topics
});

const mdp = dispatch => ({
  fetchTopics: () => dispatch(fetchUserTopics()),
  createNewTopic: data => dispatch(createNewTopic(data)),
  openModal: modalData => dispatch(openModal(modalData))
})


export default connect(msp, mdp)(UserPage)