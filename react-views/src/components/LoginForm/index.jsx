import React, {
  useState, useCallback, useEffect,
} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../actions/User';
import { validateEmail } from '../util';
import './style.css';
import profileImg from '../../assets/media/profile.png';


const LoginForm = () => {
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
    <Card className="center-vert-hor login-form-container">
      <Card.Header style={{ textAlign: 'center' }}>
        <Card.Img
          src={profileImg}
          style={{ width: '100px', margin: 'auto' }}
        />
        <Card.Title><h2>SIGN IN</h2></Card.Title>
      </Card.Header>
      <Card.Body style={{ padding: '15px' }}>
        <Form onSubmit={submitLoginData}>
          <Form.Group controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </Form.Group>
          <Form.Group controlId="user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
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
            <Button variant="link" href="/signup">Create new account</Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        {
          loginMessage ? (
            <Alert variant="danger">{loginMessage}</Alert>
          ) : null
        }
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
