import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButtonComponent from '../components/LogoutButtonComponent';
import { LOGIN_STATE } from '../utilities/constants';

const HomePage = () => {
  const authState = useSelector((state) => state.user.auth_state);
  const user = useSelector((state) => state.user.data);
  return (
    <div>
      <p><strong>Home page of Clean Clan India</strong></p>
      <div>
        {user ? (
          <>
            <Link to="/profile">
              Continue with
              {user.name}
            </Link>
            <br />
            <LogoutButtonComponent />
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <br />
        <br />
        {authState === LOGIN_STATE
          ? null
          : (
            <Link to="/signup">Create new account</Link>
          )}

      </div>
    </div>
  );
};

export default HomePage;
