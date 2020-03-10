import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../actions/User';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={() => dispatch(logoutAction())}
    >
      Log out bitches
    </button>
  );
};

export default LogoutButton;
