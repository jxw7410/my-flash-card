import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Styles from './card.module.css';


const TopicCard = props => {

  const [state, setState] = useState({
    dropDown: false,
  });


  const setDropDown = bool => {
    return e => {
      e.stopPropagation();
      e.preventDefault();
      setState({
        ...state,
        dropDown: bool
      })
    }
  }

  const editTopic = e => {
    e.preventDefault();
    props.openModal({
      type: 'EDIT_TOPIC',
      topic: props.topic
    })
  }

  const deleteTopic = e => {
    e.preventDefault();
    props.openModal({
      type: 'DELETE_TOPIC',
      topic: props.topic
    })
  }

  const redirectToQuestion = e => {
    e.preventDefault();
    props.history.push(`/topic/${props.topic.topicId}/questions`);
  }

  return (
    <li className={Styles.topicCardCtn}>
      <div className={Styles.topicCard}
        onClick={redirectToQuestion}>
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
            {props.topic.type}
          </span>
        </h1>
        <div className={Styles.topicCardName}>{props.topic.name}</div>
        <div className={Styles.topicCardDesc}>
          <h1 className={Styles.topicCardDescHdr}>Description</h1>
          <span className={Styles.topicCardDescSpan}>{props.topic.description}</span>
        </div>
      </div>
    </li>
  )
}

export default withRouter(TopicCard);