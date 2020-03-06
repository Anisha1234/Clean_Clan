import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import LoaderComponent from '../components/LoaderComponent';
import { PENDING_STATE, LOGIN_STATE } from '../utilities/constants';

// this container is a guard for pages/components that strictly require logout
const LogoutContainer = ({ children }) => {
  const authState = useSelector((state) => state.user.auth_state);
  switch (authState) {
    case LOGIN_STATE:
      return (
        <Redirect to="/profile" />
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

export default LogoutContainer;

LogoutContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
