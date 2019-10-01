import React, { useState, useEffect } from 'react';
import Styles from './card.module.css';


const DemoCard = props => {
  const [state, setState] = useState({
    rotateDeg: 0
  });

  // Check is componented is mounted in order to prevent setState of an unmounted component
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    rotate();
    return () => {
      isMounted = false;
    }
  }, [state])

  const rotate = () => {
    return setTimeout( () => {
      let rotateDeg = state.rotateDeg;
      rotateDeg += ( rotateDeg === 0 ? 180 : -180);
      if (isMounted) {
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
    fontSize: '24px'
  }

  return (
    <div style={cardContainerStyle} className={Styles.cardCtn}>
      <div style={tempCardStyle} className={`${Styles.card} ${Styles.front}`}>
        Javascript is a ______ language.
      </div>
      <div style={tempCardStyle} className={`${Styles.card} ${Styles.back}`}>
        Answer: Weird
      </div>
    </div>
  )
}




export default DemoCard;

