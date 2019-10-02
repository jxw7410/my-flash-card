import React, { useEffect, useState } from 'react';
import SlideInput from '../shared/slide_input';
import Styles from './session.module.css';

const Login = props => {
  const [state, setState] = useState({
    isMounted: false,
    email: "",
    password: "",
  })


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
      setState({ ...state, [field]: text });
    }
  }

  const handleSumbit = e => {
    e.preventDefault();
  }

  return (
    <div className={`${Styles.sessionCtn}  ${state.isMounted ? Styles.sessionCtnMounted : ""}`}>
      <div className={Styles.loginCtn}>
        <section className={Styles.ctnHdr}>
          Login To Your Account
        </section>
        <form
          onSubmit={handleSumbit}
          className={Styles.ctnBody}>
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

          <button className={Styles.submitBtn} type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;