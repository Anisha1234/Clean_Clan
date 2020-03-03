import React, { useState } from 'react';
import ErrorDisplayComponent from './ErrorDisplayComponent';
import { checkLoginState } from '../actions/authActions';

const LoginFormComponent = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(null);

  const validateEmail = (inputEmail) => {
    const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(inputEmail);
  };

  const submitLoginData = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('invalid email');
    }
    console.log(password);
    // submit data
    checkLoginState();
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
      <ErrorDisplayComponent error={error} />
    </form>
  );
};

export default LoginFormComponent;
