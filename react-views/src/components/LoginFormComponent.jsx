import React, { useState } from 'react';
import ErrorDisplayComponent from './ErrorDisplayComponent';

const LoginFormComponent = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
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
    // submit data
  };

  return (
    <form onSubmit={submitLoginData}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required="true"
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChage={(e) => setPassword(e.target.value)}
          placeholder="password"
          required="true"
        />
      </label>
      <input type="submit" />
      <ErrorDisplayComponent error={error} />
    </form>
  );
};

export default LoginFormComponent;
