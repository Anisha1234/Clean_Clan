import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import './style.css';

const PostPage = ({ postID }) => (
  <>
    <NavBar />
    <Row className="post-page-container">
      <Col lg={3} />
      <Col lg={6}>
        <Post postID={postID} />
      </Col>
    </Row>
  </>
);

export default PostPage;

PostPage.propTypes = {
  postID: PropTypes.string,
};

PostPage.defaultProps = {
  postID: '',
};
