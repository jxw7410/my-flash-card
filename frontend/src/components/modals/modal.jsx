import React, {Fragment} from 'react';
import Styles from './modal.module.css';
import TopicModal from './topic_modal_container';
import DeleteTopicModal from './delete_topic_modal_container';


const Modal = ({modal, closeModal}) => {
  if (!modal){
    return null;
  }

  let component;
  switch(modal.type) {
    case 'CREATE_TOPIC':
      component = <TopicModal topic={{}}/>
      break;
    case 'EDIT_TOPIC':
      component = <TopicModal topic={modal.topic}/>
      break;
    case 'DELETE_TOPIC':
      component = <DeleteTopicModal topic={modal.topic} />
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