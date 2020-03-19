import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { validateEmail } from '../util';
import { signupAction } from '../../store/user';
import { DONE, FAIL } from '../../constants';
import './style.css';

const givenCity = [
  { value: 'Bhubaneswar' },
  { value: 'Mumbai' },
  { value: 'Kolkata' },
  { value: 'Delhi' },
];

const SignupForm = () => {
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
  const userDetailTextRef = useRef();

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

  const handleUserDetailsText = useCallback((e) => {
    setDetails(e.target.value);
    userDetailTextRef.current.style.height = '40px';
    userDetailTextRef.current.style.height = `${`${e.target.scrollHeight}px`}`;
  }, [userDetailTextRef]);

  const submitSignupData = useCallback((e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSignupMessage('Invalid email');
      return;
    }
    dispatch(signupAction(name, email, details, city, password));
  }, [dispatch, name, email, details, city, password]);

  return (
    <Card className="signup-form-container center-vert-hor">
      <Card.Header style={{ textAlign: 'center', height: '50px' }}>
        <Card.Title>SIGN UP</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitSignupData}>
          <Form.Group controlId="user-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Elon Musk"
              required
            />
          </Form.Group>
          <Form.Group controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </Form.Group>
          <Form.Group controlId="user-details">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleUserDetailsText}
              placeholder="Describe about yourself..."
              className="user-description"
              required
              ref={userDetailTextRef}
            />
          </Form.Group>
          <Form.Group controlId="user-city">
            <Form.Label>Current city</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="user-submit"
            style={{ textAlign: 'center' }}
          >
            <Button
              variant="outline-dark"
              type="submit"
              style={{ padding: '10px' }}
            >
              Submit
            </Button>
            <br />
            <Button variant="link" href="/login">Already have account? Sign in!</Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        {
          signupMessage ? (
            <Alert
              variant={signupStatus === FAIL ? 'danger' : 'info'}
            >
              {signupMessage}
            </Alert>
          ) : null
        }
      </Card.Footer>
    </Card>
  );
};

export default SignupForm;
