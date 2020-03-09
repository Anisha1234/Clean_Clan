import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../actions/User';

const LogoutButtonComponent = () => {
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

export default LogoutButtonComponent;
