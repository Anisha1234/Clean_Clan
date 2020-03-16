import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GiPencil } from 'react-icons/gi';
import PropTypes from 'prop-types';
import Post from '../Post';
import PostForm from '../PostForm';
import { getPostsAction } from '../../actions/Post';
import './style.css';

const Feed = ({ isMine }) => {
  const [postFormShow, setPostFormShow] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => (
    isMine ? state.posts.my_posts.data
      : state.posts.all_posts.data
  ));
  useEffect(() => {
    dispatch(getPostsAction(isMine));
  }, [dispatch, isMine]);

  return (
    <>
      <Row className="justify-content-center feed-row">
        <Button
          variant="outline-info"
          onClick={() => setPostFormShow(true)}
        >
          <GiPencil style={{ fontSize: '40px' }} />
          Create a post
        </Button>
      </Row>
      <Modal
        show={postFormShow}
        onHide={() => setPostFormShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share your idea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="post-form-modal">
          <PostForm />
        </Modal.Body>
      </Modal>
      {
        posts.map((post) => (
          <Row
            key={post.id}
            className="justify-content-center feed-row"
          >
            <Post
              postType={post.type_post}
              postID={post.id}
              author={post.author}
              date={post.date}
              heading={post.heading}
              location={post.location}
              likes={post.likes}
              description={post.description}
              likeCount={post.like_count}
              imageBefore={post.image_before}
              imageAfter={post.image_after}
            />
          </Row>
        ))
      }
    </>
  );
};

export default Feed;

Feed.propTypes = {
  isMine: PropTypes.bool,
};

Feed.defaultProps = {
  isMine: false,
};
