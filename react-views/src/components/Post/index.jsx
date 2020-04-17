import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import PostForm from '../PostForm';
import PostPreview from '../PostPreview';
import PostContent from './PostContent';
import PostSubtitle from './PostSubtitle';
import AuthorBar from './AuthorBar';
import InteractionBar from './InteractionBar';
import useSinglePost from '../../containers/singlePostHook';
import { PENDING, FAIL } from '../../constants';
import './style.css';

const Post = ({ postID }) => {
  const [solFormOpen, setSolFormOpen] = useState(false);
  const currentUserID = useSelector((state) => state.user.data.userID);
  const {
    requestStatus, requestError,
    post, authorName, authorImage,
  } = useSinglePost(postID);
  if (requestStatus === PENDING) {
    return <Loader />;
  }
  if (requestStatus === FAIL || !post) {
    return (<p><strong>{requestError || 'Cannot find such post'}</strong></p>);
  }
  return (
    <>
      <Card style={{ width: '90%' }} border="light">
        <Card.Header>
          <AuthorBar
            authorName={authorName}
            authorImage={authorImage}
            authorID={post.author}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/post/${postID}`} className="post-link">
              {post.heading}
            </Link>
          </Card.Title>
          <Card.Subtitle>
            <Badge variant={post.post_type === 'Challenge' ? 'danger' : 'success'}>
              {post.post_type}
            </Badge>
            <PostSubtitle
              postType={post.post_type}
              solution={post.solution}
              author={post.author}
              openSolForm={() => setSolFormOpen(true)}
              currentUserID={currentUserID}
            />
          </Card.Subtitle>
          <PostContent
            date={post.date}
            location={post.location}
            description={post.description}
            imageBefore={post.image_before}
            imageAfter={post.image_after}
            challenge={post.challenge}
            solution={post.solution}
          />
          <InteractionBar
            postID={postID}
            description={post.description}
            likeCount={post.like_count}
            likes={post.likes}
            currentUserID={currentUserID}
          />
        </Card.Body>
      </Card>
      <Modal show={solFormOpen} onHide={() => setSolFormOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Solve this challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPreview postID={postID} />
          <PostForm
            type="Solution"
            responsePostID={postID}
            closeForm={() => setSolFormOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Post;

Post.propTypes = {
  postID: PropTypes.string.isRequired,
};
