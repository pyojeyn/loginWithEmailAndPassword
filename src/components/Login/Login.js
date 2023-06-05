import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


// 이 안에서 useState 사용 불가.
const emailReducer = (state, action) => {
  
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

  const authCtx = useContext(AuthContext);


  // 여기서 useContext 호출 하면 안됨.
  // 리액트 함수 컴포넌트 또는 사용자 정의 리액트 훅 함수 안에서 호출되어야
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEAN UP');
    };
  }, []);


  const { isValid: emailIsValid } = emailState; // 별칭 할당(emailIsValid)
  const { isValid: passwordIsValid } = passwordState;


  useEffect(() => {
    
    const identifier = setTimeout(() =>{
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );      
    }, 500)
    


    return () => {
      console.log('clean up!히히');
      clearTimeout(identifier); // 브라우저에 내장되어있는 것.
    }; // 클린업 함수
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {

    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setEnteredEmail(event.target.value);
      //   setFormIsValid(
      //   event.target.value.includes('@') && passwordState.isValid
      // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        id="email" 
        label="E-Mail" 
        type="email"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        
        <Input 
        id="password" 
        label="Password" 
        type="password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
