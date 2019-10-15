import * as TopicsApi from '../utils/topics_api';

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const RECEIVE_TOPIC = 'RECIEVE_TOPIC';
export const RECEIVE_TOPIC_ERRORS = 'RECEIVE_TOPIC_ERRORS';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const CLEAR_TOPIC_ERRORS = 'CLEAR_TOPIC_ERRORS';

const receiveTopics = topics => ({
  type: RECEIVE_TOPICS,
  topics
})

const receiveTopic = topic => ({
  type: RECEIVE_TOPIC,
  topic
})

const receiveTopicErrors = errors => ({
  type: RECEIVE_TOPIC_ERRORS,
  errors
})

const deleteTopicAction = topic => ({
  type: DELETE_TOPIC,
  topic
})

export const clearTopicErrors = () => ({
  type: CLEAR_TOPIC_ERRORS
})

export const fetchUserTopics = () => dispatch => {
  return TopicsApi.fetchUserTopics().then(
    topics => {
      dispatch(receiveTopics(topics.data));
      return Promise.resolve();
    },
    err => {
      dispatch(receiveTopicErrors(err.response.data));
      return Promise.reject();
    }
  )
}

export const createNewTopic = data => dispatch => {
  return TopicsApi.createNewTopic(data).then(
    topic => {
      dispatch(receiveTopic(topic.data));
      return Promise.resolve();
    },
    err => {
      dispatch(receiveTopicErrors(err.response.data));
      return Promise.reject();
    }
  )
}

export const editTopic = data => dispatch => {
  return TopicsApi.editTopic(data).then(
    topic => {
      dispatch(receiveTopic(topic.data));
      return Promise.resolve();
    },
    err => {
      dispatch(receiveTopicErrors(err.response.data));
      return Promise.reject();
    }
  )
}



export const deleteTopic = data => dispatch => {
  return TopicsApi.deleteTopic(data).then(topic => {
      dispatch(deleteTopicAction(topic.data));
      return Promise.resolve();
    },
    err => {
      dispatch(receiveTopicErrors(err.response.data));
      return Promise.reject();
    }
  )
}