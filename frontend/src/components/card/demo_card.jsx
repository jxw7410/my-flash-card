import React, { useState, useEffect, useRef } from 'react';
import Styles from './card.module.css';


const DemoCard = props => {
  const [state, setState] = useState({
    rotateDeg: 0
  });

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
        setState({rotateDeg})
      }
    }, timeout)
  }

  // styles
  const cardContainerStyle = {
    transform: `rotateY(${state.rotateDeg}deg)`
  }

  const tempCardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '24px'
  }

  return (
    <div style={cardContainerStyle} className={Styles.cardCtn}>
      <div style={tempCardStyle} className={`${Styles.card} ${Styles.front}`}>
        <span> Question: </span>
        <br/>
        <span>Javascript is a ______ language.</span>
      </div>
      <div style={tempCardStyle} className={`${Styles.card} ${Styles.back}`}>
        Answer: Weird
      </div>
    </div>
  )
}




export default DemoCard;

