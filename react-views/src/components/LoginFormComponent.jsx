import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/User';
import { validateEmail } from '../utilities/helpers';


const LoginFormComponent = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginMessage, setLoginMessage] = useState(null);
  const submitLoginFormMessage = useSelector((state) => state.user.auth.message);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoginMessage(submitLoginFormMessage);
  }, [submitLoginFormMessage]);

  const submitLoginData = useCallback((e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setLoginMessage('invalid email');
      return;
    }
    // submit data
    dispatch(loginAction(email, password));
  }, [dispatch, email, password]);
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
