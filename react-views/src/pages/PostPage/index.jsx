import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import Loader from '../../components/Loader';
import useSinglePost from '../../containers/singlePostHook';
import { PENDING, FAIL } from '../../constants';
import './style.css';

const PostPage = ({ postID }) => {
  const { requestError, requestStatus, post } = useSinglePost(postID);
  return (
    <>
      <NavBar />
      <Row className="post-page-container">
        <Col lg={3} />
        <Col lg={6}>
          {
            (() => {
              if (requestStatus === PENDING) {
                return <Loader />;
              }
              if (requestStatus === FAIL || !post) {
                return (
                  <p>
                    <strong>{requestError || 'Could not find the post'}</strong>
                  </p>
                );
              }
              return (
                <Post
                  postType={post.post_type}
                  postID={post.id}
                  author={post.author.id}
                  authorName={post.author.name}
                  authorImage={post.author.image}
                  date={post.date}
                  heading={post.heading}
                  location={post.heading}
                  description={post.description}
                  likeCount={post.like_count}
                  likes={post.likes}
                  imageBefore={post.image_before}
                  imageAfter={post.image_after}
                  solution={post.solution}
                  challenge={post.challenge}
                />
              );
            })()
          }
        </Col>
      </Row>
    </>
  );
};

export default PostPage;

PostPage.propTypes = {
  postID: PropTypes.string.isRequired,
};
