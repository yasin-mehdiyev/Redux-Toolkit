import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authProcess } from "../../../store/features/auth/authAction";
import classes from "../Login/Login.module.css";

const Signup = () => {

  const dispatch = useDispatch();
  const history = useHistory();

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
    }

    // Will Calling SignUp Action
    dispatch(authProcess(requestData, "sign up"));
    history.replace("/auth");

    emailRef.current.value = '';
    passwordRef.current.value = '';
    
  };

  return (
    <section className={classes.auth}>
      <h1>Sign up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button style={{ marginBottom: "10px" }}>Sign up</button>

          <Link to="/auth">
            <div className={classes.sign_up}>Login Page</div>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
