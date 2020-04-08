import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineSolution, AiFillCheckCircle } from 'react-icons/ai';
import { FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PostForm from '../PostForm';
import PostPreview from '../PostPreview';
import AuthorBar from './AuthorBar';
import { updatePostLike } from '../../store/posts';
import { createImageURL } from '../../util';
import './style.css';

const Post = ({
  postType, postID,
  author, authorName, authorImage,
  date, heading, location, description,
  imageBefore, imageAfter,
  likeCount, likes,
  solution, challenge,
}) => {
  const [solFormOpen, setSolFormOpen] = useState(false);
  const currentUserID = useSelector((state) => state.user.data.userid);
  const dispatch = useDispatch();
  const [haveUserLiked, setHaveUserLiked] = useState(likes.indexOf(currentUserID) !== -1);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const togglePostLike = useCallback(() => {
    setHaveUserLiked((currentLikeStatus) => {
      dispatch(updatePostLike(postID, !currentLikeStatus));
      setCurrentLikeCount((c) => c + (currentLikeStatus ? -1 : 1));
      return !currentLikeStatus;
    });
  }, [dispatch, postID]);

  return (
    <>
      <Card
        style={{ width: '90%' }}
        border="light"
      >
        <Card.Header>
          <AuthorBar authorName={authorName} authorImage={authorImage} />
        </Card.Header>
        <Card.Body>
          <Card.Title><a href={`/post/${postID}`}>{heading}</a></Card.Title>
          <Card.Subtitle>
            <Badge variant={postType === 'Challenge' ? 'danger' : 'success'}>
              {postType}
            </Badge>
            {
              (() => {
                if (postType === 'Solution') return null;
                const alreadySolved = (
                  <>
                    <AiFillCheckCircle />
                    Already solved!
                  </>
                );
                const notSolved = (
                  <>
                    <AiOutlineSolution />
                    Solve now!
                  </>
                );
                if (solution) {
                  return (
                    <Button variant="link">
                      {alreadySolved}
                    </Button>
                  );
                }
                if (author !== currentUserID) {
                  return (
                    <Button variant="link" onClick={() => setSolFormOpen(true)}>
                      {notSolved}
                    </Button>
                  );
                }
                return null;
              })()
            }
          </Card.Subtitle>
          <small className="text-muted">
            {new Date(date).toLocaleString()}
            <MdLocationOn />
            {` ${location}`}
          </small>
          {solution && <PostPreview postID={solution} />}
          {challenge && <PostPreview postID={challenge} />}
          <Card.Text>
            {description}
          </Card.Text>
          <CardGroup>
            {
              imageBefore ? (
                <Card border="light">
                  <Card.Img src={createImageURL(imageBefore)} />
                </Card>
              ) : null
            }
            {
              imageAfter ? (
                <Card border="light">
                  <Card.Img src={createImageURL(imageAfter)} />
                </Card>
              ) : null
            }
          </CardGroup>
          <Row className="justify-content-around post-interaction-bar">
            <button type="button" className="hidden-btn" onClick={togglePostLike}>
              {haveUserLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
              <Badge variant="info" pill>{currentLikeCount}</Badge>
            </button>
            <a href={`https://twitter.com/intent/tweet?text=${description}`}>
              <FaTwitter style={{ fontSize: '20px', color: ' #38A1F3' }} />
            </a>
          </Row>
        </Card.Body>
      </Card>
      <Modal show={solFormOpen} onHide={() => setSolFormOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Solve this challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPreview postID={postID} />
          <PostForm type="Solution" responsePostID={postID} />
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
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
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
