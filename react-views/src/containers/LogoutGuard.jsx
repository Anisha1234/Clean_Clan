import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';
import { PENDING, LOGGED_IN } from '../constants';

// this is a guard for pages/components that strictly require logout
const LogoutGuard = ({ children }) => {
  const authState = useSelector((state) => state.user.auth.status);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/profile" } }
  switch (authState) {
    case LOGGED_IN:
      return (
        <Redirect to={from} />
      );
    case PENDING:
      return <Loader />;
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
