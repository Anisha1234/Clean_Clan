import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { logout } from '../store/user';

const LogoutButton = ({ variant }) => {
  const dispatch = useDispatch();
  return (
    <Button
      type="button"
      onClick={() => dispatch(logout())}
      variant={variant}
      block
    >
      SIGN OUT
    </Button>
=======
=======
import Button from 'react-bootstrap/Button';
>>>>>>> 4054e8b... add react-bootstrap and design home page
import { useDispatch } from 'react-redux';
=======
>>>>>>> f770ec9... bootstrap navbar
import { logoutAction } from '../actions/User';
=======
import { logoutAction } from '../store/user';
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
import { logout } from '../store/user';
>>>>>>> 560a7fe... add formik + reform redux store

const LogoutButton = ({ variant }) => {
  const dispatch = useDispatch();
  return (
    <Button
      type="button"
      onClick={() => dispatch(logout())}
      variant={variant}
      block
    >
<<<<<<< HEAD
      Log out bitches
    </button>
>>>>>>> 0cb3de1... Rename components to reduce file name length
=======
      SIGN OUT
    </Button>
>>>>>>> 4054e8b... add react-bootstrap and design home page
  );
};

export default LogoutButton;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f770ec9... bootstrap navbar

LogoutButton.propTypes = {
  variant: PropTypes.string,
};

LogoutButton.defaultProps = {
  variant: 'secondary',
};
<<<<<<< HEAD
=======
>>>>>>> 0cb3de1... Rename components to reduce file name length
=======
>>>>>>> f770ec9... bootstrap navbar
