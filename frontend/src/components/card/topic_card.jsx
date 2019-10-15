import React, {useState} from 'react';
import Styles from './card.module.css';


const TopicCard = ({ topic, openModal }) => {

  const [state, setState] = useState({
    dropDown: false,
  });


  const setDropDown = bool => {
    return e => {
      e.preventDefault();
      setState({
        ...state,
        dropDown: bool
      })
    }
  }

  const editTopic = e => {
    e.preventDefault();
    openModal({
      type: 'EDIT_TOPIC',
      topic
    })
  }

  const deleteTopic = e => {
    e.preventDefault();
    openModal({
      type: 'DELETE_TOPIC',
      topic
    })
  }

  return (
    <li className={Styles.topicCardCtn}>
      <div className={Styles.topicCard}>
        <div className={Styles.topicCardOptions}
          tabIndex='0'
          onClick={state.dropDown ? setDropDown(false) : setDropDown(true)}
          onBlur={setDropDown(false)}>
          <i className={`fas fa-ellipsis-v ${Styles.fas}`} />
          <ul
            onClick={ e => e.stopPropagation()}
            className={`${Styles.topicCardDropDown} ${state.dropDown ? Styles.topicCardDropDownActive : ""}`} >
            <li onClick={editTopic}>Edit</li>
            <li onClick={deleteTopic}>Delete</li>
          </ul>
        </div>
        <h1 className={Styles.topicCardHdr}>
          <span className={Styles.topicCardHdrSpan}>
            {topic.type}
          </span>
        </h1>
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