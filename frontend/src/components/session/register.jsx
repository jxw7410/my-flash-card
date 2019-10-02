import React, { useEffect, useState } from 'react';
import SlideInput from '../shared/slide_input';
import Styles from './session.module.css';

const Register = props => {
  const [state, setState] = useState({
    isMounted: false,
    username: "",
    email: "",
    password: "",
  });

  /* 
    This will raise a warning because React thinks this would cause infinite rerendering.
    This would be the case if useEffect was used like componentDidUpdate, but in this case
    It is used like ComponentDidMount, so the warning is ignorable.
  */
  useEffect(() => {
    setState({ ...state, isMounted: true })
  }, [])


  const textChange = field => {
    return e => {
      e.preventDefault();
      const text = e.currentTarget.value;
      setState({...state, [field]: text});
    }
  }

  const handleSumbit = e => {
    e.preventDefault();
    const userData = {
      username: state.username,
      email: state.email,
      password: state.password
    }

    props.registerUser(userData);
  }

  return (
    <div className={`${Styles.sessionCtn}  ${state.isMounted ? Styles.sessionCtnMounted : ""}`}>
      <div className={Styles.loginCtn}>
        <section className={Styles.ctnHdr}>
          Sign Up For An Account
        </section>
        <form
          onSubmit={handleSumbit}
          className={Styles.ctnBody}>
          <SlideInput 
            type='text'
            label='Username'
            changeEvent={textChange('username')}
            text={state.username}
          />

          <SlideInput
            type='email'
            label='Email'
            changeEvent={textChange('email')}
            text={state.email}
          />


          <SlideInput
            type='password'
            label='Password'
            changeEvent={textChange('password')}
            text={state.password}
          />

          <button className={Styles.submitBtn} type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register;