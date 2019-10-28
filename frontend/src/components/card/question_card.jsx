import React, { useState } from 'react';
import Styles from './card.module.css';


const QuestionCard = props => {

  const [state, setState] = useState({
    rotateDeg: 0,
  })


  const onCardClick = e => {
    e.preventDefault();
    let rotateDeg = state.rotateDeg;
    rotateDeg += (rotateDeg === 0 ? 180 : -180);
    setState({...state, rotateDeg})
  }

  const cardContainerStyle = {
    transform: `rotateY(${state.rotateDeg}deg)`
  }

  return ( 
    <div 
      style={cardContainerStyle} 
      className={`${Styles.cardCtn} ${Styles.qCardCtn}`}
      onClick={onCardClick}>
      <div className={`${Styles.card} ${Styles.front}`}>
        <section className={Styles.cardHdrCtn}>
          <span className={Styles.cardHdr}> Question: </span>
        </section>
        <section className={Styles.cardContent}>
          <span>{ props.card.question }</span>
        </section>
      </div>
      <div className={`${Styles.card} ${Styles.back}`}>
        <section className={Styles.cardHdrCtn}>
          <span className={Styles.cardHdr}>Answer:</span>
        </section>
        <section className={Styles.cardContent}>
          <span style={{fontSize: '20px'}}>{props.card.answer}</span>
        </section>
      </div>
    </div>
  );
}


export default QuestionCard;