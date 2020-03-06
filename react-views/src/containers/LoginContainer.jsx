import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoaderComponent from '../components/LoaderComponent';
import { PENDING_STATE, LOGOUT_STATE } from '../utilities/constants';

// this container is a guard for pages/components that strictly require login
const LoginContainer = ({ children }) => {
  const authState = useSelector((state) => state.user.auth_state);
  const location = useLocation();
  switch (authState) {
    case LOGOUT_STATE:
      return (
        <Redirect to={{
          pathname: '/',
        }}
        />
      );
    case PENDING_STATE:
      return <LoaderComponent />;
    default:
      return (
        <>
          {children}
        </>
      );
  }
};

export default LoginContainer;

LoginContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
