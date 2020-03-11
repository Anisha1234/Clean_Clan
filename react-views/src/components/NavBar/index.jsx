import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from '../LogoutButton';
import './style.css';

const givenPaths = ['/profile', '/issue', '/leaderboard'];
const givenLinkName = ['Profile', 'Issue', 'Leaderboard'];

const NavBar = () => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  useEffect(() => {
    setActivePathIndex(givenPaths.indexOf(window.location.pathname));
  }, []);
  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand href="#" style={{ float: 'left' }}>
        Clean India App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="my-nav" />
      <Navbar.Collapse
        id="my-nav"
        className="justify-content-end"
      >
        <Nav variant="pills">
          {
            givenLinkName.map((linkName, index) => (
              <Nav.Item key={linkName}>
                <Nav.Link
                  href={givenPaths[index]}
                  active={index === activePathIndex}
                >
                  {linkName}
                </Nav.Link>
              </Nav.Item>
            ))
          }
          <Nav.Item style={{ width: '100px' }}>
            <LogoutButton variant="outline-light" />
          </Nav.Item>
        </Nav>
        <Nav
          style={{ width: '300px' }}
          className="justify-content-end"
        />

      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
