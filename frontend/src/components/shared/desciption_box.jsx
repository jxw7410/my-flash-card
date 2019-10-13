import React, { useState } from 'react';
import Styles from './shared.module.css';

/* 
*/


const DescriptionBox = (props) => {

  const [state, setState] = useState({
    isFocused: false,
  });


  const setFocus = bool => {
    return e => {
      e.preventDefault();
      setState({
        isFocused: bool
      })
    }
  }


  // Boolean logics to determine the final outcome of the classes
  // This is set up with the intention that the default styles can be overridden

  const labelClass = `${props.labelClass || Styles.descLabel}  
    ${(state.isFocused || props.value.length) ? (props.labelActive || Styles.labelFocused) : ""}`;

  return (
    <div className={Styles.container}>
      <div className={props.labelCtnClass || Styles.descriptionBoxCtn}>
        <label className={labelClass}>
          {props.label}
        </label>

        <textarea
          maxLength={props.maxLength || 160}
          className={Styles.textArea}
          onFocus={setFocus(true)}
          onBlur={setFocus(false)}
          onChange={props.onChange}
          value={props.value}
        />

        <span className={Styles.wordCountSpan}>
          { (props.maxLength || 160) - props.value.length}
        </span>
      </div>
    </div>
  )
}


export default DescriptionBox;