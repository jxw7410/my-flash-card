import * as QuestionApi from '../utils/questions_api';

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTIONS_ERRORS = 'RECEIVE_QUESTIONS_ERRORS';
export const RECEIVE_COUNT = 'RECEIVE_COUNT';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_ALL_QUESTIONS = 'DELETE_ALL_QUESTIONS';
export const CLEAR_QUESTIONS_ERRORS = 'CLEAR_QUESTIONS_ERRORS';


const receiveQuestion = question => ({
  type: RECEIVE_QUESTION,
  question
})


const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
})


const receiveErrors = errors => ({
  type: RECEIVE_QUESTIONS_ERRORS,
  errors
})

const receiveCount = count => ({
  type: RECEIVE_COUNT,
  count
})

const deleteQuestionAction = questionId => ({
  type: DELETE_QUESTION,
  questionId
})

export const clearQuestionErrors = () => ({
  type: CLEAR_QUESTIONS_ERRORS
})

export const clearQuestions = () =>({
  type: DELETE_ALL_QUESTIONS
})

export const fetchQuestions = topicId => dispatch => {
  return QuestionApi.fetchQuestions(topicId)
    .then( response => { 
      dispatch(receiveQuestions(response.data));
      return Promise.resolve();
    }, err => {
      dispatch(receiveErrors(err.response.data));
      return Promise.reject();
    });
}


export const createQuestion = data => dispatch => {
  return QuestionApi.createQuestion(data)
    .then( response => {
      dispatch(receiveQuestion(response.data));
      return Promise.resolve();
    }, err => {
      dispatch(receiveErrors(err.response.data));
      return Promise.reject();
    })
}


export const editQuestion = data => dispatch => {
  return QuestionApi.editQuestion(data).then( res => {
    dispatch(receiveQuestion(res.data));
    return Promise.resolve();
  },
  err => {
    dispatch(receiveErrors(err.response.data));
    return Promise.reject();
  });
}

export const deleteQuestion = data => dispatch => {
  return QuestionApi.deleteQuestion(data).then( res => {
      dispatch(deleteQuestionAction(res.data.questionId)); 
      return Promise.resolve();
    }, 
    err => {
      dispatch(receiveErrors(err.response.data));
      return Promise.reject();
    });
}

export const getQuestionsCount = topicId => dispatch => {
  return QuestionApi.getQuestionsCount(topicId)
    .then(res => {
      dispatch(receiveCount(res.data.count));
      return Promise.resolve();
    });
}