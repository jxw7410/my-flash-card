import axios from 'axios';

export const fetchUserTopics = () => (
  axios.get('api/topics')
)

export const createNewTopic = data => (
  axios.post('api/topics', data)
)

export const editTopic = data => (
  axios.put(`api/topics/${data.topicId}`, data)
)

export const deleteTopic = data => (
  axios.delete(`api/topics/${data.topicId}`, data)
)

