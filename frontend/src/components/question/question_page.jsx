import React, { useEffect, useState, useRef} from 'react';
import Styles from './question_page.module.css';
import QuestionCard from '../card/question_card';


const QuestionPage = props => {
  const [state, setState] = useState({
    leftPos: 0,
    cardNum: 1,
    sideNavAnimated: false,
  });


  useEffect(() => {
    async function fetchData() {
      if (!props.topic.topicId) {
        try { await props.fetchTopic(props.match.params.topicId) } 
        catch (err) { console.log('fetching failed?') }
        fetchQuestions();
        props.getQuestionsCount(props.match.params.topicId);
      } else {
        fetchQuestions();
        props.getQuestionsCount(props.match.params.topicId);
      }
    }
    fetchData();
  }, [])

  useEffect( () => {
      document.addEventListener('keydown', keyPressEventHandler);
      return () => document.removeEventListener('keydown', keyPressEventHandler);
  }, [keyPressEventHandler]); 

  const fetchQuestions = async () => {
    try { await props.fetchQuestions(props.match.params.topicId);}  
    catch { props.clearQuestions();}
  }
  
  const createQuestionModal = e => {
    e.preventDefault();
    props.openModal({
      type: 'CREATE_QUESTION',
      topicId: props.match.params.topicId
    })
  }

  const editQuestionModal = e => {
    e.preventDefault();
    const question = getQuestion(props.questions, state.cardNum - 1);

    props.openModal({
      type: 'EDIT_QUESTION',
      question: {
        topicId: props.match.params.topicId,
        questionId: question.questionId,
        question: question.question,
        answer: question.answer
      }
    });
  }

  const deleteQuestion = e => {
    e.preventDefault();
    const question = getQuestion(props.questions, state.cardNum - 1);

    const deleteQuestionCallBack = async () => {
      await props.deleteQuestion({
        topicId: props.match.params.topicId,
        questionId: question.questionId
      });
    
      if ( state.cardNum >= props.questionsCount ) shiftPos('LEFT')();
    }

    props.openModal({
      type: 'DELETE_QUESTION',
      deleteCallBack: deleteQuestionCallBack
    });
  }
  
  const shiftPos = direction => e => {
    if (direction === 'LEFT' && state.cardNum !== 1){
      const leftPos = state.leftPos + 540;
      const cardNum = state.cardNum - 1;
      setState({...state, leftPos, cardNum});
    } else if (direction === 'RIGHT' && state.cardNum !== props.questionsCount) {
      const leftPos = state.leftPos - 540;
      const cardNum = state.cardNum + 1;
      setState({ ...state, leftPos,  cardNum});
    }
  }


  function keyPressEventHandler(e){
    if(!props.isModalOpen){
      const { key, keyCode } = e;
      if (keyCode === 37 || key === 'arrowLeft' ) shiftPos('LEFT')(e);
      else if (keyCode === 39 || key === 'arrowRight') shiftPos('RIGHT')(e);
    }
  }


  const questions = Object.keys(props.questions).map(questionId =>
    <QuestionCard key={questionId} card={props.questions[questionId]} />
  );

  return (
    <div className={Styles.questionPageCtn}>
      <section className={Styles.sideNavCtn}>
        <div 
          onAnimationEnd={ () => setState({...state, sideNavAnimated: true})}
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
              onClick={createQuestionModal}
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
                <section className={Styles.navCenter}>
                  {`${state.cardNum} / ${props.questionsCount}`}
                  <div>
                    <button className={Styles.editBtn} onClick={editQuestionModal} type='button'>Edit</button>
                    <button className={Styles.delBtn} onClick={deleteQuestion} type='button'>Delete</button>
                  </div>
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


function getQuestion(questions, index){
  let i = 0;
  for(const key in questions) {
    if( i === index) return questions[key];
    i++;
  }
}

export default QuestionPage;