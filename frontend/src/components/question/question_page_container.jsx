import { connect } from 'react-redux';
import QuestionPage from './question_page';
import { fetchTopic } from '../../actions/topics_action';
import { fetchQuestions, clearQuestions, getQuestionsCount,  deleteQuestion} from '../../actions/questions_action';
import { openModal } from '../../actions/modal_action';


const msp = (state, props) => {
  // There is a possible topic does not exist due to user reloading.
  const topic = state.topics[props.match.params.topicId] || {};
  return {
    topic,
    questions: state.questionsReducer.questions,
    questionsCount: state.questionsReducer.count,
  }
}


const mdp = dispatch => ({
  fetchTopic: topicId => dispatch(fetchTopic(topicId)),
  fetchQuestions: topicId => dispatch(fetchQuestions(topicId)),
  getQuestionsCount: topicId =>  dispatch(getQuestionsCount(topicId)),
  openModal: modalData => dispatch(openModal(modalData)),
  deleteQuestion: data => dispatch(deleteQuestion(data)),
  clearQuestions: () => dispatch(clearQuestions())
})

export default connect(msp, mdp)(QuestionPage);