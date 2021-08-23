import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authProcess } from "../../../store/features/auth/authAction";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (ev) => {
    ev.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const requestData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    // Will Calling SignIn Action
    dispatch(authProcess(requestData, "login"));

    if(isLoggedIn) {
        history.replace('/admin');
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
          <Link to="/auth/forget">
            <a className={classes.forgotten}>Forgot Password</a>
          </Link>
        </div>
        <div className={classes.actions}>
          <button style={{ marginBottom: "10px" }}>Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
