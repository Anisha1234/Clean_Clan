import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const [activePath, setActivePath] = useState('');
  const userPic = useSelector((state) => state.user.data.image.current);
  const userName = useSelector((state) => state.user.data.name);
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);
  return (
    <Navbar expand="md" bg="dark" variant="dark" fixed="top" className="my-nav-container">
      <Navbar.Brand href="#" className="nav-title">
        Clean India App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="my-nav" />
      <Navbar.Collapse
        id="my-nav"
        className="justify-content-center"
      >
        <Nav variant="pills">
          <Nav.Item key="Profile">
            <Nav.Link
              href="/profile"
              active={activePath === '/profile'}
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
            </Nav.Link>
          </Nav.Item>
          {
            givenLinkName.map((linkName, index) => (
              <Nav.Item key={linkName}>
                <Nav.Link
                  href={givenPaths[index]}
                  active={givenPaths[index] === activePath}
                  className="nav-link"
                >
                  {linkName}
                </Nav.Link>
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
