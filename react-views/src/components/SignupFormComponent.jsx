import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
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
  const isUnmounted = useRef(false);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(givenCity[0].value);
  const [details, setDetails] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [signupMessage, setSignupMessage] = useState(undefined);
  const history = useHistory();

  useEffect(() => () => {
    isUnmounted.current = true;
  }, []);

  const submitSignupData = useCallback((e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSignupMessage('Invalid email');
    }
    signup(name, email, details, city, password)
      .then(({ data: message }) => {
        // if sign up successfully, auto redirect to login
        let displayMessage = message;
        if (message === 'ok') {
          // change the message for user to understand
          displayMessage = `Account is succesfully registered. 
          You will be direct to login page shortly`;
          setTimeout(() => {
            history.push('/login');
          }, 2500);
        }
        if (!isUnmounted.current) {
          setSignupMessage(displayMessage);
        }
      })
      .catch((signUpError) => {
        if (!isUnmounted.current) {
          setSignupMessage(signUpError.toString());
        }
      });
  }, [isUnmounted, history, name, email, details, city, password]);

  return (
    <form
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
      <label htmlFor="user-details">
        Description
        <textarea
          name="user-details"
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe about yourself..."
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
