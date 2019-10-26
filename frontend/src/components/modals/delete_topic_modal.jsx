import React from 'react';
import Styles from './modal.module.css';

const DeleteTopicModal = props => {

  const cancelDelete = e => {
    props.closeModal();
  }

  return (
    <div className={Styles.deleteModalCtn}>
      <div className={Styles.deleteModalInfo}>
        <span className={Styles.delModalSpan}>Are you sure you want to delete this?</span>
      </div>
      <div className={Styles.delModalBtnCtn}>
        <button 
          className={Styles.delModalDelBtn}
          type='button' 
          onClick={props.deleteCallBack}> Delete </button>
        <button 
          className={Styles.delModalCancelBtn}
          type='button' 
          onClick={cancelDelete}> Cancel </button> 
      </div>
    </div>
  )
}


export default DeleteTopicModal;