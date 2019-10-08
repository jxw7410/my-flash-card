import React, { useState, useEffect} from 'react';
import Styles from './modal.module.css'
import SlideInput from '../shared/slide_input';

const NewTopicModal = props => {

  const [state, setState] = useState({
    topicName: "",
    topicType: "",
    topicDescription: "",
    isMounted: false,
  });

  useEffect( () => {
    setTimeout(() => {
      setState({
        ...state, 
        isMounted: true
      })
    }, 0);
  }, [])


  const textChangeEvent = field => {
    return e => {
      setState({
        ...state,
        [field]: e.currentTarget.value
      })
    }
  }

  const createNewTopic = e => {
    e.preventDefault();
    const data = {
      name: state.topicName,
      type: state.topicType,
      description: state.topicDescription
    }
    props.createNewTopic(data)
      .then(() => {
        props.closeModal();
      });
  }

  return (
    <div 
      onClick ={ e => e.stopPropagation() }
      style={state.isMounted ? null : { top: '-20px', opacity: 0 }}
      className={Styles.newTopicModalCtn}>
      <section className={Styles.newTopicHdr}>New Topic</section>
      <section>
        <form 
          onSubmit={createNewTopic}
          className={Styles.newTopicForm}>
          <SlideInput 
            type='text'
            label="Topic Name"
            changeEvent={textChangeEvent('topicName')}
            text = {state.topicName}
          />
          
          <SlideInput
            type='text'
            label="Topic Type"
            changeEvent={textChangeEvent('topicType')}
            text={state.topicType}
          />

          <textarea 
            className={Styles.newTopicTextArea} 
            placeholder="Describe this topic..."
            onChange={textChangeEvent("topicDescription")}
            value={state.topicDescription}
            />

          <button 
            className={Styles.createBtn} 
            type='submit'>Create</button>
        </form>
      </section>
    </div>
  )
}

export default NewTopicModal;