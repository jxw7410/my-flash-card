import React, { useState, useEffect } from 'react';
import Styles from './modal.module.css'

const CreateQuestionModal = props => {
  const [state, setState] = useState({
    question: "",
    answer: "",
    isMounted: false
  })

  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        isMounted: true
      })
    }, 0);
  }, []);

  const textChange = field => {
    return e => {
      e.preventDefault();
      setState({
        ...state,
        [field]: e.currentTarget.value,
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      topicId: props.topicId,
      question: state.question,
      answer: state.answer
    }

    props.createQuestion(data);
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={state.isMounted ? null : { top: '-20px', opacity: 0 }}
      className={Styles.newTopicModalCtn}>
      <h1 className={Styles.newTopicHdr}> New Question </h1>
      <form
        onSubmit={handleSubmit}
        className={Styles.newTopicForm}>
        <textarea onChange={textChange('question')} value={state.question} />
        <textarea onChange={textChange('answer')} value={state.answer} />
        <button
          className={Styles.createBtn}
          type='submit'>{state.isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  )
}

export default CreateQuestionModal;