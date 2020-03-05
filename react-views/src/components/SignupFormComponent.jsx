import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../utilities/helpers';
import { signup } from '../services/UserService';

const givenCity = [
  { value: 'Bhubaneswar' },
  { value: 'Mumbai' },
  { value: 'Kolkata' },
  { value: 'Delhi' },
];

const SignupFormComponent = () => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(givenCity[0]);
  const [password, setPassword] = useState(undefined);
  const [signupMessage, setSignupMessage] = useState(undefined);
  const history = useHistory();
  const submitSignupData = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSignupMessage('Invalid email');
    }
    signup(name, email, city, password)
      .then(({ data: message }) => {
        // if sign up successfully, auto redirect to login
        if (message === 'ok') {
          setSignupMessage(`Account is succesfully registered. 
            You will be direct to login page shortly`);
          setTimeout(() => {
            history.push('/login');
          }, 2500);
          return;
        }
        setSignupMessage(message);
      })
      .catch((error) => {
        setSignupMessage(error.toString());
      });
  };
  return (
    <form
      encType="multipart/form-data"
      onSubmit={submitSignupData}
    >
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name here..."
          required
        />
      </label>
      <br />
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
      <label htmlFor="city">
        City:
        <select
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {
            givenCity.map((cityOption) => (
              <option
                key={cityOption.value}
                value={cityOption.value}
              >
                {cityOption.value}
              </option>
            ))
          }
        </select>
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
      <br />
      <input type="submit" />
      <p>
        {signupMessage}
      </p>
    </form>
  );
};

export default SignupFormComponent;
