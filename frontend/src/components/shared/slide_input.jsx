import React, {useState} from 'react';
import Styles from './shared.module.css';

/*
  How to use: 
    <SlideInput 
      type={type}
      label={label}
      onChange={ eventHandler }
      text={ state.text}
    />
*/

const SlideInput = ({ type, label, changeEvent, text, errorMessage = "" }) => {
  const [state, setState] = useState({
    isFocused: false,
  });

  const onFocus = bool => {
    return e => {
      e.preventDefault();
      setState({ ...state, isFocused: bool})
    }
  }

  // CSS Styles 
  const labelClasses = `${Styles.label} ${ (state.isFocused || text.length) ? Styles.labelFocused: ""}`

  return (
    <div className={Styles.container}>
      <label className={Styles.labelCtn}>
        <span className={labelClasses}>{label}</span>
        <input
          className={Styles.input}
          type={type}
          onFocus={onFocus(true)}
          onBlur={onFocus(false)}
          onChange={changeEvent}
          value={text}
        />
      </label>
      <span className={Styles.error}>{errorMessage}</span>
    </div>
  )
}


export default SlideInput;