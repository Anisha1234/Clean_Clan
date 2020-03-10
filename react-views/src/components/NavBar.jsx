import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const NavBar = () => (
  <>
    <NavLink to="/profile">Profile</NavLink>
    <NavLink to="/leaderboard">Leaderboard</NavLink>
    <NavLink to="/issues">Issues</NavLink>
    <LogoutButton />
  </>
);

export default NavBar;
