import React from 'react';
import Styles from './modal.module.css'

const NewTopicModal = props => {
  return (
    <div className={Styles.newTopicModalCtn}>
      <section className={Styles.newTopicHdr}>New Topic</section>
      <section></section>
    </div>
  )
}

export default NewTopicModal;