import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../store/user';
import { validateEmail } from '../util';
import './style.css';
import profileImg from '../../assets/media/profile.png';


const LoginForm = () => {
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
        <Card.Img
          src={profileImg}
          style={{ width: '100px', margin: 'auto' }}
        />
        <Card.Title><h2>SIGN IN</h2></Card.Title>
      </Card.Header>
      <Card.Body style={{ padding: '15px' }}>
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
            <Button
              variant="outline-dark"
              type="submit"
              style={{ padding: '10px' }}
              disabled={formHandler.isSubmitting}
            >
              Sign in now
            </Button>
            <br />
            <Button variant="link" href="/signup">Create new account</Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        {
          loginError ? (
            <Alert variant="danger">{loginError}</Alert>
          ) : null
        }
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
