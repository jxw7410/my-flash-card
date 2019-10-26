import axios from 'axios';


export const fetchQuestions = topicId => (
  axios.get(`api/topics/${topicId}/questions`)
)

export const createQuestion = data => (
  axios.post(`api/topics/${data.topicId}/questions`, data)
)

export const editQuestion = data => (
  axios.put(`api/topics/${data.topicId}/questions/${data.questionId}`, data)
)

export const deleteQuestion = ({topicId, questionId}) => (
  axios.delete(`api/topics/${topicId}/questions/${questionId}`)
)

export const getQuestionsCount = topicId => (
  axios.get(`api/topics/${topicId}/questions/count`)
)
