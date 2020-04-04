import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  );
};

export default LogoutButton;

LogoutButton.propTypes = {
  variant: PropTypes.string,
};

LogoutButton.defaultProps = {
  variant: 'secondary',
};
