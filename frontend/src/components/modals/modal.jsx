import React, {Fragment} from 'react';
import Styles from './modal.module.css';
import NewTopicModal from './new_topic_modal_container';

const Modal = ({modal, closeModal}) => {
  if (!modal){
    return null;
  }

  let component;

  switch(modal) {
    case 'CREATE_TOPIC':
      component = <NewTopicModal />
      break;
    default:
      return null
  }

  return (
    <Fragment>
      {
        component ? 
        <div className={ Styles.modalBackground } onClick={closeModal}> 
          <div onClick={ e => e.stopPropagation()}>
            { component }
          </div>
        </div> : null
      }
    </Fragment>
  )
}

export default Modal;