import React from 'react';
import Styles from './modal.module.css';

const DeleteTopicModal = props => {
  const deleteTopic = e => {
    e.preventDefault();
    const data = {
      topicId: props.topic.topicId
    }

    props.deleteTopic(data)
  }

  const cancelDelete = e => {
    props.closeModal();
  }

  return (
    <div className={Styles.deleteModalCtn}>
      <div className={Styles.deleteModalInfo}>
        <span className={Styles.delModalSpan}>Are you sure you want to delete this topic?</span>
      </div>
      <div className={Styles.delModalBtnCtn}>
        <button 
          className={Styles.delModalDelBtn}
          type='button' 
          onClick={deleteTopic}> Delete </button>
        <button 
          className={Styles.delModalCancelBtn}
          type='button' 
          onClick={cancelDelete}> Cancel </button> 
      </div>
    </div>
  )
}


export default DeleteTopicModal;