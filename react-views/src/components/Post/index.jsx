import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import PostForm from '../PostForm';
import PostPreview from '../PostPreview';
import PostContent from './PostContent';
import PostSubtitle from './PostSubtitle';
import AuthorBar from './AuthorBar';
import InteractionBar from './InteractionBar';
import './style.css';

const Post = ({
  postType, postID,
  author, authorName, authorImage,
  date, heading, location, description,
  imageBefore, imageAfter,
  likeCount, likeStatus,
  solution, challenge,
}) => {
  const [solFormOpen, setSolFormOpen] = useState(false);
  const currentUserID = useSelector((state) => state.user.data.userid);

  return (
    <>
      <Card style={{ width: '90%' }} border="light">
        <Card.Header>
          <AuthorBar authorName={authorName} authorImage={authorImage} />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/post/${postID}`} className="post-link">
              {heading}
            </Link>
          </Card.Title>
          <Card.Subtitle>
            <Badge variant={postType === 'Challenge' ? 'danger' : 'success'}>
              {postType}
            </Badge>
            <PostSubtitle
              postType={postType}
              solution={solution}
              author={author}
              openSolForm={() => setSolFormOpen(true)}
              currentUserID={currentUserID}
            />
          </Card.Subtitle>
          <PostContent
            date={date}
            location={location}
            description={description}
            imageBefore={imageBefore}
            imageAfter={imageAfter}
            challenge={challenge}
            solution={solution}
          />
          <InteractionBar
            postID={postID}
            description={description}
            likeCount={likeCount}
            likeStatus={likeStatus}
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
  postType: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  likeStatus: PropTypes.bool.isRequired,
  imageBefore: PropTypes.string.isRequired,
  imageAfter: PropTypes.string,
  solution: PropTypes.string,
  challenge: PropTypes.string,
};

Post.defaultProps = {
  imageAfter: '',
  solution: '',
  challenge: '',
};
