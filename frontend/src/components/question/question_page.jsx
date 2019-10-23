import React, { useEffect, useState, useReducer } from 'react';
import Styles from './question_page.module.css';
import QuestionCard from '../card/question_card';
import {getQuestionCount} from '../../utils/questions_api';

const QuestionPage = props => {
  const [state, setState] = useState({
    leftPos: 0,
    cardNum: 1,
    sideNavAnimated: false,
  })

  const [reducedState, dispatch] = useReducer( localReducer, { count: 0});

  const fetchQuestionCount = () => {
    return getQuestionCount(props.match.params.topicId)
      .then(res => {
        dispatch({ type: 'RECEIVE_COUNT', count: res.data.count })
        return Promise.resolve();
      });
  }

  /* 
    Reason why fetchTopic is awaited is because I don't want to 
    for any reason try to fetchQuestions unless I know for sure I have a topicId 
    that exists.
   */
  useEffect(() => {
    async function fetchData() {
      if (!props.topic.topicId) {
        try { await props.fetchTopic(props.match.params.topicId) } 
        catch (err) { console.log('fetching failed?') }
        fetchQuestions();
        fetchQuestionCount();
      } else {
        fetchQuestions();
        fetchQuestionCount();
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
  
  const shiftPos = direction => e => {
    e.preventDefault();
    if (direction === 'LEFT' && state.cardNum !== 1){
      const leftPos = state.leftPos + 540;
      const cardNum = state.cardNum - 1;
      setState({...state, leftPos, cardNum});
    } else if (direction === 'RIGHT' && state.cardNum !== reducedState.count) {
      const leftPos = state.leftPos - 540;
      const cardNum = state.cardNum + 1;
      setState({ ...state, leftPos,  cardNum});
    }
  }

  const questions = Object.keys(props.questions).map(questionId => 
      <QuestionCard key={questionId} card={props.questions[questionId]} />
    );

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
      <section style={{ flexDirection: 'column' }}>
        { 
          questions.length ? 
            <>
              <div className={Styles.cardNav}>
                <i onClick={shiftPos('LEFT')} className={`fas fa-arrow-circle-left ${Styles.cardNavArrows}`} />
                <section style={{fontSize: '24px'}}>
                  {`${state.cardNum} / ${reducedState.count}`}
                </section>
                <i onClick={shiftPos('RIGHT')} className={`fas fa-arrow-circle-right ${Styles.cardNavArrows}`} />
              </div>
              <div className={Styles.cardListCtn}>
                <ul style={{ left: `${state.leftPos}px` }} className={Styles.cardList}>
                  {questions}
                </ul> 
              </div>
            </>
            : filler() 
        }
      </section>
    </div>
  )
}


function localReducer(state, action){
    Object.freeze(state); 
    switch(action.type){
      case 'RECEIVE_COUNT':
        return { count: action.count}
      case 'INCREMENT_COUNT':
        return { count: state.count + 1}
      case 'DECREMENT_COUNT':
        return { count: state.count - 1}
      default:
        return state;
    }
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