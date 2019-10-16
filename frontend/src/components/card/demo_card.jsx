import React, { useState, useEffect, useRef } from 'react';
import Styles from './card.module.css';


const DemoCard = props => {
  const [state, setState] = useState({
    rotateDeg: 0,
    randomWord: ""
  });

  const listOfWords = [
    "A weird language.",
    "An awesome language!",
    "I don't like Javascript...",
    'Wat?',
    'What the hell is Javascript?',
    "A scripting language used for web development."
  ]

  // Check is componented is mounted in order to prevent setState of an unmounted component
  let isMounted = useRef(false);

  // ComponentDidUpdate.
  useEffect(() => {
    if (isMounted.current) {
      rotate(3000);
    }
  });

  // ComponentDidMount, and ComponentWillUnmount equivalent.
  // We need isMounted to makesure setState does not trigger when timeout happens.
  useEffect(() => {
    isMounted.current = true;
    rotate(1500);
    return () => {
      isMounted.current = false;
    }
  }, [])


  const rotate = timeout => {
    return setTimeout( () => {
      let rotateDeg = state.rotateDeg;
      rotateDeg += ( rotateDeg === 0 ? 180 : -180);
      if (isMounted.current) {
        if (rotateDeg === 180){
          const randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
          setState({ randomWord, rotateDeg});
        } else {
          setState({...state, rotateDeg})
        } 
      }
    }, timeout)
  }

  // styles
  const cardContainerStyle = {
    transform: `rotateY(${state.rotateDeg}deg)`
  }


  return (
    <div style={cardContainerStyle} className={Styles.cardCtn}>
      <div className={`${Styles.card} ${Styles.front}`}>
        <section className={Styles.cardHdrCtn}>
          <span className={Styles.cardHdr}> Question: </span>
        </section>
        <section className={Styles.cardContent}> 
          <span>Javascript is ______ language. </span>
        </section>
      </div>
      <div className={`${Styles.card} ${Styles.back}`}>
        <section className={Styles.cardHdrCtn}>
          <span className={Styles.cardHdr}>Answer:</span>
        </section>
        <section className={Styles.cardContent}>
          <span>{state.randomWord}</span>
        </section>
      </div>
    </div>
  )
}




export default DemoCard;

