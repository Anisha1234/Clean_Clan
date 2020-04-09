import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from '../LogoutButton';
import { createImageURL } from '../../util';
import profileImg from '../../assets/media/profile.png';
import './style.css';

const givenPaths = ['/timeline', '/issue', '/ranking'];
const givenLinkName = ['Timeline', 'Issue', 'Ranking'];

const NavBar = () => {
  const userPic = useSelector((state) => state.user.data.image.current);
  const userName = useSelector((state) => state.user.data.name);
  return (
    <Navbar expand="md" bg="dark" variant="dark" fixed="top" className="my-nav-container">
      <Navbar.Brand href="/timeline" className="nav-title">
        Clean India App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="my-nav" />
      <Navbar.Collapse
        id="my-nav"
        className="justify-content-center"
      >
        <Nav variant="pills">
          <Nav.Item className="nav-item-content">
            <NavLink
              to="/profile"
              activeClassname = "active"
              className="nav-link"
            >
              <Image
                roundedCircle
                fluid
                src={createImageURL(userPic) || profileImg}
                className="user-pic"
              />
              {' '}
              {userName}
            </NavLink>
          </Nav.Item>
          {
            givenLinkName.map((linkName) => (
              <Nav.Item key={linkName}  className="nav-item-content">
                <NavLink
                  to={`/${linkName}`}
                  activeClass = "active"
                  className="nav-link"
                >
                  {linkName}
                </NavLink>
              </Nav.Item>
            ))
          }
          <Nav.Item style={{ width: '100px', marginLeft: '8px' }}>
            <LogoutButton variant="outline-light" />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
