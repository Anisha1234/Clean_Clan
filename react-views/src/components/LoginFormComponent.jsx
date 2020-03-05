import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/UserAction';

const validateEmail = (inputEmail) => {
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(inputEmail);
};


const LoginFormComponent = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginMessage, setLoginMessage] = useState(null);
  const dispatch = useDispatch();

  const submitLoginData = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setLoginMessage('invalid email');
    }
    // submit data
    dispatch(loginAction(email, password))
      .catch((loginError) => setLoginMessage(loginError.toString()));
  };
  return (
    <form onSubmit={submitLoginData}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
      </label>
      <input type="submit" />
      <p>
        {loginMessage}
      </p>
    </form>
  );
};

export default LoginFormComponent;
