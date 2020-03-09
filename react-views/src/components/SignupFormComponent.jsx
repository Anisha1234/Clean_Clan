import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { validateEmail } from '../utilities/helpers';
import { signupAction } from '../actions/User';
import { DONE } from '../utilities/constants';

const givenCity = [
  { value: 'Bhubaneswar' },
  { value: 'Mumbai' },
  { value: 'Kolkata' },
  { value: 'Delhi' },
];

const SignupFormComponent = () => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(givenCity[0].value);
  const [details, setDetails] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [signupMessage, setSignupMessage] = useState(undefined);
  const submitSignupFormMessage = useSelector((state) => state.user.registration.message);
  const signupStatus = useSelector((state) => state.user.registration.status);
  const history = useHistory();
  const dispatch = useDispatch();

  // update sign-up form submission message
  useEffect(() => {
    setSignupMessage(submitSignupFormMessage);
  }, [submitSignupFormMessage]);

  // if submit succesfully, redirect to login
  useEffect(() => {
    let timer;
    if (signupStatus === DONE) {
      timer = setTimeout(() => {
        history.push('/login');
      }, 2500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [history, signupStatus]);

  const submitSignupData = useCallback((e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSignupMessage('Invalid email');
      return;
    }
    dispatch(signupAction(name, email, details, city, password));
  }, [dispatch, name, email, details, city, password]);

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
