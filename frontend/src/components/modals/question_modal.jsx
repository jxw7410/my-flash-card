import React, { useState, useEffect } from 'react';
import Styles from './modal.module.css'
import DescriptionBox from '../shared/desciption_box';

const CreateQuestionModal = props => {
  const [state, setState] = useState({
    question: props.question ? props.question.question : "",
    answer: props.question ? props.question.answer : "",
    isEdit: props.question ? true : false,
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

  const editQuestion = e => {
    e.preventDefault();
    props.editQuestion({
      topicId: props.question.topicId,
      questionId: props.question.questionId,
      question: state.question,
      answer: state.answer
    }).then(() => props.closeModal())
  }

  const createQuestion = e => {
    e.preventDefault();

    props.createQuestion({
      topicId: props.topicId,
      question: state.question,
      answer: state.answer
    }).then( () => props.closeModal());
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={state.isMounted ? null : { top: '-20px', opacity: 0 }}
      className={Styles.newTopicModalCtn}>
      <h1 className={Styles.newTopicHdr}> { state.isEdit ? "Edit Question" : "New Question" }</h1>
      <form
        onSubmit={state.isEdit ? editQuestion : createQuestion}
        className={Styles.newTopicForm}>
        <br />
        <DescriptionBox 
          onChange={textChange('question')} 
          value={state.question}
          label="Question" 
          maxLength="315" />
        <br />
        <DescriptionBox 
          onChange={textChange('answer')} 
          value={state.answer} 
          label="Answer"
          maxLength="315" />
        <button
          className={Styles.createBtn}
          type='submit'>{state.isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  )
}

export default CreateQuestionModal;