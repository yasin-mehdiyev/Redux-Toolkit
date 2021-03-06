import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authProcess } from "../../../store/features/auth/authAction";
import classes from "../Login/Login.module.css";

const ForgottenPassword = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();

  const submitHandler = (ev) => {
    ev.preventDefault();
    const request = {
        requestType: 'PASSWORD_RESET',
        email: emailRef.current.value,
    };
    if(emailRef.current.value !== '') {
        dispatch(authProcess(request,'sent reset link to email'));
    }

    history.replace('/auth');  
    emailRef.current.value = '';
  };

  return (
    <section className={classes.auth}>
      <h1>Reset Password</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>

        <div className={classes.actions}>
          <button style={{marginBottom: '10px'}}>Send reset link</button>
          <Link to='/auth'>
            <div className={classes.sign_up}>
                Login Page
            </div>
          </Link>
        </div>

      </form>
    </section>
  );
};

export default ForgottenPassword;
