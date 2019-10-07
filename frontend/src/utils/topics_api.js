import axios from 'axios';

export const fetchUserTopics = () => (
  axios.get('api/topics')
)

export const createNewTopic = data => {
  axios.post('api/topics/new', data)
}