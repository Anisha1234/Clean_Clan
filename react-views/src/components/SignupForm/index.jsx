import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateEmail } from '../util';
import { signup } from '../../store/user';
import './style.css';

const givenCities = [
  { value: 'Bhubaneswar' },
  { value: 'Mumbai' },
  { value: 'Kolkata' },
  { value: 'Delhi' },
];

const SignupForm = () => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const history = useHistory();
  // if submit succesfully, redirect to login
  useEffect(() => {
    let timer;
    if (registrationStatus) {
      timer = setTimeout(() => {
        history.push('/login');
      }, 2500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [history, registrationStatus]);

  // form handler
  const formHandler = useFormik({
    initialValues: {
      name: '',
      email: '',
      city: givenCities[0].value,
      password: '',
      user_details: '',
    },
    onSubmit: async (values) => {
      try {
        await signup(values);
        if (!isMounted.current) return;
        setRegistrationStatus(true);
        setRegistrationMessage(
          `Your account has been registered. 
          You will be redirected to sign-in page shortly`,
        );
        return;
      } catch (error) {
        if (!isMounted.current) return;
        setRegistrationStatus(false);
        if (error && error.response) {
          setRegistrationMessage(error.response.data.tostring());
        }
        setRegistrationMessage(error.toString());
      }
    },
    validate: (values) => {
      const {
        name, email, password, user_details: userDetails,
      } = values;
      const error = {};
      if (!name) error.name = 'Invalid name';
      if (!validateEmail(email)) error.email = 'Invalid email';
      if (!password) error.password = 'Invalid password';
      if (!userDetails) error.user_details = 'Invalid details';
      return error;
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Card className="signup-form-container center-vert">
      <Card.Header style={{ height: '50px' }} className="text-center">
        <Card.Title>SIGN UP</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={formHandler.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formHandler.values.name}
              onChange={formHandler.handleChange}
              placeholder="Elon Musk"
              isInvalid={formHandler.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
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
              type="password"
              name="password"
              value={formHandler.values.password}
              onChange={formHandler.handleChange}
              placeholder="password"
              isInvalid={formHandler.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="user_details">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="user_details"
              type="text"
              value={formHandler.values.user_details}
              onChange={formHandler.handleChange}
              placeholder="Describe about yourself..."
              isInvalid={formHandler.errors.user_details}
            />
            <Form.Control.Feedback type="invalid">
              {formHandler.errors.user_details}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>Current city</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={formHandler.values.city}
              onChange={formHandler.handleChange}
            >
              {
                givenCities.map((cityOption) => (
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
          <Form.Group controlId="registration-message">
            {
            registrationMessage ? (
              <Alert
                variant={registrationStatus ? 'info' : 'danger'}
              >
                {registrationMessage}
              </Alert>
            ) : null
          }
          </Form.Group>
          <Form.Group className="text-center">
            <Button
              variant="outline-dark"
              type="submit"
              style={{ padding: '10px' }}
              disabled={formHandler.isSubmitting && !registrationStatus}
            >
              Register now
            </Button>
            <br />
            <Button variant="link" href="/login">Already have account? Sign in!</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignupForm;
