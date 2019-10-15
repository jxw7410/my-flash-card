import React, { useState, useEffect} from 'react';
import Styles from './modal.module.css'
import SlideInput from '../shared/slide_input';
import DescriptionBox from '../shared/desciption_box';

const NewTopicModal = props => {

  const [state, setState] = useState({
    topicName: props.topic.name || "",
    topicType: props.topic.type || "",
    topicDescription: props.topic.description || "",
    isEdit: props.topic.name,
    isMounted: false,
  });

  useEffect( () => {
    setTimeout(() => {
      setState({
        ...state, 
        isMounted: true
      })
    }, 0);

    return () => {
      props.clearErrors();
    }
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

  const editTopic = e => {
    e.preventDefault();
    const data = {
      topicId: props.topic.topicId,
      name: state.topicName,
      type: state.topicType,
      description: state.topicDescription
    }

    props.editTopic(data)
      .then(() => {
        props.closeModal();
      })
  }

  let parsedErrors = {};
  for(const error of props.errors) {
    parsedErrors = Object.assign({}, parsedErrors, error);
  }

  return (
    <div 
      onClick ={ e => e.stopPropagation() }
      style={state.isMounted ? null : { top: '-20px', opacity: 0 }}
      className={Styles.newTopicModalCtn}>
      <section className={Styles.newTopicHdr}>{ state.isEdit ? "Edit Topic" : "New Topic" }</section>
      <section>
        <form 
          onSubmit={ state.isEdit ? editTopic : createNewTopic }
          className={Styles.newTopicForm}>
          <br/>
          <SlideInput 
            type='text'
            label="Topic Name"
            changeEvent={textChangeEvent('topicName')}
            text = {state.topicName}
            errorMessage={ parsedErrors.Name || "" }
          />
          <br/>
          <SlideInput
            type='text'
            label="Topic Type"
            changeEvent={textChangeEvent('topicType')}
            text={state.topicType}
            errorMessage={ parsedErrors.Type || ""}
          />
          <br/>
          <DescriptionBox 
            label="Description"
            onChange={textChangeEvent('topicDescription')}
            value={state.topicDescription}
          />

          <button 
            className={Styles.createBtn} 
            type='submit'>{state.isEdit ? "Edit" : "Create"}</button>
        </form>
      </section>
    </div>
  )
}

export default NewTopicModal;