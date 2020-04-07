import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import Loader from '../components/Loader';
<<<<<<< HEAD
<<<<<<< HEAD
import { PENDING, LOGGED_OUT } from '../constants';
=======
import LoaderComponent from '../components/LoaderComponent';
=======
import Loader from '../components/Loader';
>>>>>>> 4054e8b... add react-bootstrap and design home page
import { PENDING, LOGGED_OUT } from '../utilities/constants';
>>>>>>> 7dc8a09... refactor redux store
=======
import { PENDING, LOGGED_OUT } from '../util';
>>>>>>> f86c3d6... Split common logic (util.js)
=======
import { PENDING, LOGGED_OUT } from '../constants';
>>>>>>> cf60350... Refactor redux code to microservice structure

// this is a guard for pages/components that strictly require login
const LoginGuard = ({ children }) => {
  const authState = useSelector((state) => state.user.auth.status);
  switch (authState) {
    case LOGGED_OUT:
      return (
        <Redirect to="/" />
      );
    case PENDING:
<<<<<<< HEAD
<<<<<<< HEAD
      return <Loader />;
=======
      return <LoaderComponent />;
>>>>>>> 7dc8a09... refactor redux store
=======
      return <Loader />;
>>>>>>> 4054e8b... add react-bootstrap and design home page
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
