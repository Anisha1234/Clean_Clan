import React, { /* useState, */ } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
// import PostForm from '../../components/PostForm';
// import Post from '../../components/Post';
// import { getPostsAction } from '../../actions/Post';
import './style.css';


const ProfilePage = () => (
  <>
    <NavBar />
    <Container className="profile-page-content">
      <Col md={4}>
        <UserProfile />
      </Col>
    </Container>
  </>
);
export default ProfilePage;
