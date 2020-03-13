import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Post from '../Post';
import { getPostsAction } from '../../actions/Post';

const Feed = ({ isMine }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => (
    isMine ? state.posts.my_posts.data
      : state.posts.all_posts.data
  ));
  useEffect(() => {
    dispatch(getPostsAction(isMine));
  }, [dispatch]);

  return posts.map((post) => (
    <Row
      key={post.id}
      className="justify-content-center"
      style={{ marginTop: '20px' }}
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
  ));
};

export default Feed;

Feed.propTypes = {
  isMine: PropTypes.bool,
};

Feed.defaultProps = {
  isMine: false,
};
