import React, { useEffect, useState } from 'react';
import Styles from './question_page.module.css';
import QuestionCard from '../card/question_card';

const QuestionPage = props => {
  const [state, setState] = useState({
    sideNavAnimated: false,
  })

  useEffect(() => {
    async function fetchData() {
      if (!props.topic.topicId) {
        try { await props.fetchTopic(props.match.params.topicId) } 
        catch (err) { console.log('fetching failed?') }
        fetchQuestions();
      } else {
        fetchQuestions();
      }
    }
    fetchData();
  }, [])


  const fetchQuestions = async () => {
    try { await props.fetchQuestions(props.match.params.topicId);}  
    catch { props.clearQuestions();}
  }
  
  const openModal = e => {
    e.preventDefault();
    props.openModal({
      type: 'CREATE_QUESTION',
      topicId: props.match.params.topicId
    });
  }
 

  const questions = Object.keys(props.questions).map(questionId => {
    return (
      // <li key={questionId}>{props.questions[questionId].question}</li>
      <QuestionCard key={questionId} card={props.questions[questionId]} />
    )
  })

  return (
    <div className={Styles.questionPageCtn}>
      <section className={Styles.sideNavCtn}>
        <div 
          onAnimationEnd={ e => setState({...state, sideNavAnimated: true})}
          className={`${Styles.sideNav} ${ state.sideNavAnimated ? "" : Styles.sideNavAnimate}`}>
          <section className={Styles.sideNavSec1}>
            {props.topic.type}
          </section>
          <section className={`${Styles.sideNavSec1} ${Styles.sideNavSec2}`}>
            {props.topic.name}
          </section>
          <section>
            <button 
              className={Styles.createQuestionBtn}
              onClick={openModal}
              type='button'>Add Question</button>
          </section>
        </div>
      </section>
      <section >
        { 
          questions.length ? 
            <ul className={Styles.cardList}>
              {questions}
            </ul> : filler() 
        }
      </section>
    </div>
  )
}


function filler() {
  return (
    <>
      <span style={{ fontSize: '24px' }}>
        Looks like you don't have any Questions for this Topic.
      </span>
      <br />
      <span style={{ fontSize: '24px' }}>
        Press the Add Question button to make a new question.
      </span>
    </>
  )
}

export default QuestionPage;