import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../actions/User';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      type="button"
      onClick={() => dispatch(logoutAction())}
      variant="secondary"
      block
    >
      SIGN OUT
    </Button>
  );
};

export default LogoutButton;
