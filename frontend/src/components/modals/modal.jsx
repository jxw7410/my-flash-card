import React, {Fragment} from 'react';
import Styles from './modal.module.css';
import TopicModal from './topic_modal_container';
import QuestionModal from './question_modal_container';
import DeleteTopicModal from './delete_topic_modal_container';


const Modal = ({modalData, closeModal}) => {
  if (!modalData) return null;

  let component;
  switch(modalData.type) {
    case 'CREATE_TOPIC':
      component = <TopicModal topic={{}}/>
      break;
    case 'EDIT_TOPIC':
      component = <TopicModal topic={modalData.topic}/>
      break;
    case 'DELETE_TOPIC':
      component = <DeleteTopicModal deleteCallBack={modalData.deleteCallBack} />
      break;
    case 'CREATE_QUESTION':
      // TopicId isn't falsely written question has a relationship to topic.
      component = <QuestionModal topicId={modalData.topicId} />
      break;
    case 'EDIT_QUESTION':
      component = <QuestionModal question={modalData.question} />
      break;
    case 'DELETE_QUESTION':
      component = <DeleteTopicModal deleteCallBack={modalData.deleteCallBack} />;
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