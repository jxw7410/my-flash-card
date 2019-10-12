import React, { useEffect } from 'react';
import Styles from './user_page.module.css';
import TopicCard from '../card/topic_card';

const UserPage = props => {

  // ComponentDidMount
  useEffect(() => {
    props.fetchTopics();
  }, []);


  const openModal = e => {
    e.preventDefault();
    props.openModal('CREATE_TOPIC');
  }


  /* 
    Topics is nested as: 
  */
  
  const topics = Object.keys(props.topics).map( topicId => {
    return <TopicCard key={topicId} topic={props.topics[topicId]} />
  })


  return (
    <div className={Styles.topicsCtn}>
      <div 
        className={Styles.newTopicIcon}
        onClick={openModal}> 
        <i className={`fas fa-plus ${Styles.plusIcon}`}></i>
        <div className={Styles.newTopicIconMsg}>
          Add a new Topic 
          <div className={Styles.ntimTriangle} />
        </div>
      </div>

      {
        topics.length ?
          <ul className={Styles.topicCardCtn}>
            {topics}
          </ul> : 
          <div className={Styles.noTopics}>Looks like you have no topics.</div>
      }
    </div>
  )
}


export default UserPage;