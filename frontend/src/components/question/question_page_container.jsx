import { connect } from 'react-redux';
import QuestionPage from './question_page';
import { fetchTopic } from '../../actions/topics_action';


const msp = (state, props) => {
  // There is a possible topic does not exist due to user reloading.
  const topic = state.topics[props.match.params.topicId] || {};
  return {
    topic,
    
  }
}


const mdp = dispatch => ({
  fetchTopic: topicId => dispatch(fetchTopic(topicId)),
})

export default connect(msp, mdp)(QuestionPage);