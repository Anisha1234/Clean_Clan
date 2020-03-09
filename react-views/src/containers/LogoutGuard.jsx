import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoaderComponent from '../components/LoaderComponent';
import { PENDING, LOGGED_IN } from '../utilities/constants';

// this is a guard for pages/components that strictly require logout
const LogoutGuard = ({ children }) => {
  const authState = useSelector((state) => state.user.auth.status);
  switch (authState) {
    case LOGGED_IN:
      return (
        <Redirect to="/profile" />
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

export default LogoutGuard;

LogoutGuard.propTypes = {
  children: PropTypes.element.isRequired,
};
