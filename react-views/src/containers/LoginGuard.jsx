import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoaderComponent from '../components/LoaderComponent';
import { PENDING, LOGGED_OUT } from '../utilities/constants';

// this is a guard for pages/components that strictly require login
const LoginGuard = ({ children }) => {
  const authState = useSelector((state) => state.user.auth.status);
  switch (authState) {
    case LOGGED_OUT:
      return (
        <Redirect to="/" />
      );
    case PENDING:
      return <LoaderComponent />;
    default:
      return (
        <>
          {children}
        </>
      );
  }
};

export default LoginGuard;

LoginGuard.propTypes = {
  children: PropTypes.element.isRequired,
};
