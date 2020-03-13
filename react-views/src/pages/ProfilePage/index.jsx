import React, { /* useState, */ } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
// import PostForm from '../../components/PostForm';
// import Post from '../../components/Post';
// import { getPostsAction } from '../../actions/Post';
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
