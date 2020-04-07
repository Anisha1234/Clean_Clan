<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, {
  useState, useCallback, useEffect,
} from 'react';
>>>>>>> b7879d0... bootstrap login and signup page
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> 560a7fe... add formik + reform redux store
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
<<<<<<< HEAD
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../store/user';
import { validateEmail } from '../util';
=======
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { loginAction } from '../../actions/User';
<<<<<<< HEAD
import { validateEmail } from '../../utilities/helpers';
>>>>>>> b7879d0... bootstrap login and signup page
=======
=======
import { loginAction } from '../../store/user';
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../store/user';
>>>>>>> 560a7fe... add formik + reform redux store
import { validateEmail } from '../util';
>>>>>>> f86c3d6... Split common logic (util.js)
import './style.css';
import profileImg from '../../assets/media/profile.png';


const LoginForm = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const formHandler = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await dispatch(login(email, password));
      } catch (error) {
        if (!isMounted.current) return;
        setLoginError(error.toString());
      }
    },
    validate: (values) => {
      const { email, password } = values;
      const error = {};
      if (!validateEmail(email)) error.email = 'Invalid email format';
      if (!password) error.password = 'Invalid password format';
      return error;
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Card className="center-vert-hor login-form-container">
      <Card.Header className="text-center">
=======
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginMessage, setLoginMessage] = useState(null);
  const submitLoginFormMessage = useSelector((state) => state.user.auth.message);
  const dispatch = useDispatch();
=======
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);
>>>>>>> 560a7fe... add formik + reform redux store

  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const formHandler = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await dispatch(login(email, password));
      } catch (error) {
        if (!isMounted.current) return;
        setLoginError(error.toString());
      }
    },
    validate: (values) => {
      const { email, password } = values;
      const error = {};
      if (!validateEmail(email)) error.email = 'Invalid email format';
      if (!password) error.password = 'Invalid password format';
      return error;
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Card className="center-vert-hor login-form-container">
<<<<<<< HEAD
      <Card.Header style={{ textAlign: 'center' }}>
>>>>>>> b7879d0... bootstrap login and signup page
=======
      <Card.Header className="text-center">
>>>>>>> 560a7fe... add formik + reform redux store
        <Card.Img
          src={profileImg}
          style={{ width: '100px', margin: 'auto' }}
        />
        <Card.Title><h2>SIGN IN</h2></Card.Title>
      </Card.Header>
      <Card.Body style={{ padding: '15px' }}>
<<<<<<< HEAD
<<<<<<< HEAD
        <Form onSubmit={formHandler.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={formHandler.values.email}
              onChange={formHandler.handleChange}
              placeholder="example@email.com"
              isInvalid={formHandler.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formHandler.values.password}
              onChange={formHandler.handleChange}
              placeholder="password"
              isInvalid={formHandler.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
=======
        <Form onSubmit={submitLoginData}>
          <Form.Group controlId="user-email">
=======
        <Form onSubmit={formHandler.handleSubmit}>
          <Form.Group controlId="email">
>>>>>>> 560a7fe... add formik + reform redux store
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={formHandler.values.email}
              onChange={formHandler.handleChange}
              placeholder="example@email.com"
              isInvalid={formHandler.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formHandler.values.password}
              onChange={formHandler.handleChange}
              placeholder="password"
              isInvalid={formHandler.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
<<<<<<< HEAD
          <Form.Group
            controlId="user-submit"
            style={{ textAlign: 'center' }}
          >
>>>>>>> b7879d0... bootstrap login and signup page
=======
          <Form.Group className="text-center">
>>>>>>> 560a7fe... add formik + reform redux store
            <Button
              variant="outline-dark"
              type="submit"
              style={{ padding: '10px' }}
<<<<<<< HEAD
<<<<<<< HEAD
              disabled={formHandler.isSubmitting}
            >
              Sign in now
            </Button>
            <br />
            <Button variant="link" href="/signup">Create new account</Button>
=======
=======
              disabled={formHandler.isSubmitting}
>>>>>>> 560a7fe... add formik + reform redux store
            >
              Sign in now
            </Button>
            <br />
<<<<<<< HEAD
            <Button variant="link" href="/signup">Want to create new account? Sign up</Button>
>>>>>>> b7879d0... bootstrap login and signup page
=======
            <Button variant="link" href="/signup">Create new account</Button>
>>>>>>> f770ec9... bootstrap navbar
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        {
<<<<<<< HEAD
<<<<<<< HEAD
          loginError ? (
            <Alert variant="danger">{loginError}</Alert>
=======
          loginMessage ? (
<<<<<<< HEAD
            <Alert variant="info">{loginMessage}</Alert>
>>>>>>> b7879d0... bootstrap login and signup page
=======
            <Alert variant="danger">{loginMessage}</Alert>
>>>>>>> a46b53d... Reduce redundant code
=======
          loginError ? (
            <Alert variant="danger">{loginError}</Alert>
>>>>>>> 560a7fe... add formik + reform redux store
          ) : null
        }
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
