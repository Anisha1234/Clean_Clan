import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
import './style.css';


const ProfilePage = () => (
  <>
    <NavBar />
    <Row className="profile-page-content">
      <Col lg={3}>
        <UserProfile />
      </Col>
      <Col lg={6}>
        <Feed />
      </Col>
    </Row>
  </>
);
export default ProfilePage;
