import React from 'react';
import Styles from './card.module.css';


const TopicCard = ({ topic }) => {


  return (
    <li className={Styles.topicCardCtn}>
      <div className={Styles.topicCard}>
        <h1 className={Styles.topicCardHdr}>{topic.type}</h1>
        <div className={Styles.topicCardName}>{topic.name}</div>
        <div className={Styles.topicCardDesc}>
          <h1 className={Styles.topicCardDescHdr}>Description</h1>
          <span className={Styles.topicCardDescSpan}>{topic.description}</span>
        </div>
      </div>
    </li>
  )
}

export default TopicCard;