import React, {Fragment} from 'react';
import Styles from './modal.module.css';
import TopicModal from './topic_modal_container';
import QuestionModal from './question_modal_container';
import DeleteTopicModal from './delete_topic_modal_container';


const Modal = ({modalData, closeModal}) => {
  if (!modalData){
    return null;
  }

  let component;
  switch(modalData.type) {
    case 'CREATE_TOPIC':
      component = <TopicModal topic={{}}/>
      break;
    case 'EDIT_TOPIC':
      component = <TopicModal topic={modalData.topic}/>
      break;
    case 'DELETE_TOPIC':
      component = <DeleteTopicModal topic={modalData.topic} />
      break;
    case 'CREATE_QUESTION':
      component = <QuestionModal topicId={modalData.topicId} />
      break;
    default:
      return null
  }

  return (
    <Fragment>
      {
        component ? 
        <div className={ Styles.modalBackground } onClick={closeModal}> 
            { component }
        </div> : null
      }
    </Fragment>
  )
}

export default Modal;