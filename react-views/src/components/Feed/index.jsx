import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GiPencil } from 'react-icons/gi';
import PropTypes from 'prop-types';
import Post from '../Post';
import PostForm from '../PostForm';
import { getPosts } from '../../store/posts';
import { MINE_DOMAIN, ALL_DOMAIN } from '../../constants';
import './style.css';

const Feed = ({ author }) => {
  const [postFormShow, setPostFormShow] = useState(false);
  const handleClosePostForm = useCallback(() => {
    setPostFormShow(false);
  }, []);
  const dispatch = useDispatch();
  const postIDs = useSelector((state) => state.posts[author ? MINE_DOMAIN : ALL_DOMAIN]);
  useEffect(() => {
    dispatch(getPosts(author));
  }, [dispatch, author]);

  return (
    <>
      <Row className="justify-content-center feed-row">
        <Button
          variant="outline-info"
          onClick={() => setPostFormShow(true)}
        >
          <GiPencil style={{ fontSize: '40px' }} />
          Create a challenge
        </Button>
      </Row>
      <Modal show={postFormShow} onHide={handleClosePostForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body className="post-form-modal">
          <PostForm type="Challenge" closeForm={handleClosePostForm} />
        </Modal.Body>
      </Modal>
      {
        postIDs.map((postID) => (
          <Row
            key={postID}
            className="justify-content-center feed-row"
          >
            <Post postID={postID} />
          </Row>
        ))
      }
    </>
  );
};

export default Feed;

Feed.propTypes = {
  author: PropTypes.string,
};

Feed.defaultProps = {
  author: '',
};
