import * as TopicsApi from '../utils/topics_api';

export const RECEIVE_USER_TOPICS = 'RECEIVE_USER_TOPICS';
export const RECEIVE_CREATED_TOPIC = 'RECIEVE_CREATED_TOPIC';
export const RECEIVE_TOPIC_ERRORS = 'RECEIVE_TOPIC_ERRORS';

const receiveUserTopics = topics => ({
  type: RECEIVE_USER_TOPICS,
  topics 
})

const receiveCreatedTopic = topic => ({
  type: RECEIVE_CREATED_TOPIC,
  topic
})

const receiveTopicErrors = errors => ({
  type: RECEIVE_TOPIC_ERRORS,
  errors
})

export const fetchUserTopics = () => dispatch => {
  TopicsApi.fetchUserTopics().then(
    topics => {
      debugger
      dispatch(receiveUserTopics(topics));
    },
    err => {
      dispatch(receiveTopicErrors(err));
    }
  )
}

export const createNewTopic = data => dispatch => {
  TopicsApi.createNewTopic(data).then(
    topic => {
      dispatch(receiveCreatedTopic(topic))
    },
    err => {
      dispatch(receiveTopicErrors(err));
    }
  )
}


