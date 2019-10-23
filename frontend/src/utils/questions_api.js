import axios from 'axios';


export const fetchQuestions = topicId => (
  axios.get(`api/topics/${topicId}/questions`)
)

export const createQuestion = data => (
  axios.post(`api/topics/${data.topicId}/questions`, data)
)

export const getQuestionCount = topicId => (
  axios.get(`api/topics/${topicId}/questions/count`)
)