import React, { useState, useEffect, useRef } from 'react';
import Styles from './card.module.css';


const DemoCard = props => {
  const [state, setState] = useState({
    rotateDeg: 0
  });

  // Check is componented is mounted in order to prevent setState of an unmounted component
  let isMounted = useRef(false);

  // ComponentDidMount, and ComponentWillUnmount equivalent.
  // We need isMounted to makesure setState does not trigger when timeout happens.
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])

  // ComponentDidUpdate.
  useEffect(() => {
    if (isMounted.current){
      rotate();
    }
  });

  const rotate = () => {
    return setTimeout( () => {
      let rotateDeg = state.rotateDeg;
      rotateDeg += ( rotateDeg === 0 ? 180 : -180);
      if (isMounted.current) {
        setState({rotateDeg})
      }
    }, 3000)
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

