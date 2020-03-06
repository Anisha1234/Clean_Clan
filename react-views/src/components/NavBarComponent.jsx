import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButtonComponent from './LogoutButtonComponent';

const NavBarComponent = () => (
  <>
    <NavLink to="/profile">Profile</NavLink>
    <NavLink to="/leaderboard">Leaderboard</NavLink>
    <NavLink to="/issues">Issues</NavLink>
    <LogoutButtonComponent />
  </>
);

export default NavBarComponent;
