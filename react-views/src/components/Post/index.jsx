import React, { useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Media from 'react-bootstrap/Media';
<<<<<<< HEAD
<<<<<<< HEAD
import { MdLocationOn, MdTextFields } from 'react-icons/md';
=======
import { MdLocationOn } from 'react-icons/md';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
=======
import { MdLocationOn, MdTextFields } from 'react-icons/md';
>>>>>>> f81d4bb... Lint react-views
import { AiOutlineSolution } from 'react-icons/ai';
import { FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PostForm from '../PostForm';
import { updatePostLike } from '../../store/posts';
import { createFileURL } from '../../util';
import './style.css';

const Post = ({
  postType, postID, author,
  date, heading, location, description,
  imageBefore, imageAfter,
  likeCount, likes,
}) => {
  const [solFormOpen, setSolFormOpen] = useState(false);
  const currentUserID = useSelector((state) => state.user.data.userid);
  const dispatch = useDispatch();
  const haveUserLiked = useMemo(
    () => likes.indexOf(currentUserID) > -1,
    [likes, currentUserID],
  );
  const togglePostLike = useCallback(() => {
    dispatch(updatePostLike(postID, !haveUserLiked));
  }, [dispatch, haveUserLiked, postID]);
  return (
    <>
      <Card
        style={{ width: '90%', maxWidth: '520px' }}
        border="light"
      >
        <Card.Body>
          <Card.Title>{heading}</Card.Title>
          <Card.Subtitle>
            <Badge variant={postType === 'Challenge' ? 'danger' : 'success'}>
              {postType}
            </Badge>
          </Card.Subtitle>
          <small className="text-muted">
            {new Date(date).toLocaleString()}
          </small>
          <br />
          <small className="text-muted">
            <MdLocationOn />
            {` ${location}`}
          </small>
          <Card.Text>
            {description}
          </Card.Text>
          <CardGroup>
            {
              imageBefore ? (
                <Card border="light">
                  <Card.Img src={createFileURL(imageBefore)} />
                </Card>
              ) : null
            }
            {
              imageAfter ? (
                <Card border="light">
                  <Card.Img src={createFileURL(imageAfter)} />
                </Card>
              ) : null
            }
          </CardGroup>
          <Row className="justify-content-around post-interaction-bar">
            <button type="button" onClick={togglePostLike}>
              {haveUserLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
              <Badge variant="info" pill>{likeCount}</Badge>
            </button>
            {
<<<<<<< HEAD
<<<<<<< HEAD
              postType === 'Challenge' && author !== currentUserID
                ? (
                  <button type="button" onClick={() => setSolFormOpen(true)}>
                    <Badge variant="success">
                      <AiOutlineSolution style={{ fontSize: '16px' }} />
                      {' Solve'}
                    </Badge>
                  </button>
                ) : null
            }
            <a href={`https://twitter.com/intent/tweet?text=${description}`}>
              <FaTwitter style={{ fontSize: '20px', color: ' #38A1F3' }} />
=======
              postType === 'Challenge'
=======
              postType === 'Challenge' && author !== currentUserID
>>>>>>> 25138db... Lint react-views
                ? (
                  <button type="button" onClick={() => setSolFormOpen(true)}>
                    <Badge variant="success">
                      <AiOutlineSolution style={{ fontSize: '16px' }} />
                      {' Solve'}
                    </Badge>
                  </button>
                ) : null
            }
            <a href={`https://twitter.com/intent/tweet?text=${description}`}>
<<<<<<< HEAD
              <FaTwitter style={{ fontSize: '20px', color: ' #38A1F3', }}/>
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
=======
              <FaTwitter style={{ fontSize: '20px', color: ' #38A1F3' }} />
>>>>>>> 25138db... Lint react-views
            </a>
          </Row>
        </Card.Body>
      </Card>
<<<<<<< HEAD
<<<<<<< HEAD
      <Modal show={solFormOpen} onHide={() => setSolFormOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Solve this challenge</Modal.Title>
=======
      <Modal show={solFormOpen} onHide={()=>setSolFormOpen(false)}>
=======
      <Modal show={solFormOpen} onHide={() => setSolFormOpen(false)}>
>>>>>>> 25138db... Lint react-views
        <Modal.Header closeButton>
<<<<<<< HEAD
          <Modal.Title>Solve this post</Modal.Title>
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
=======
          <Modal.Title>Solve this challenge</Modal.Title>
>>>>>>> f81d4bb... Lint react-views
        </Modal.Header>
        <Modal.Body>
          <Card border="light">
            <Media>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <img width={60} height={60} src={createFileURL(imageBefore)} alt="something" />
              <Media.Body>
                <h6>
                  <MdTextFields />
                  {' '}
                  {heading}
                </h6>
                <p>
                  <MdLocationOn />
                  {' '}
                  {location}
                </p>
              </Media.Body>
            </Media>
          </Card>
          <PostForm type="Solution" responsePostID={postID} />
=======
              <img width={50} height={50} src = {createFileURL(imageBefore)}/>
=======
              <img width={50} height={50} src={createFileURL(imageBefore)} alt="something" />
>>>>>>> 25138db... Lint react-views
=======
              <img width={60} height={60} src={createFileURL(imageBefore)} alt="something" />
>>>>>>> f81d4bb... Lint react-views
              <Media.Body>
                <h6>
                  <MdTextFields />
                  {' '}
                  {heading}
                </h6>
                <p>
                  <MdLocationOn />
                  {' '}
                  {location}
                </p>
              </Media.Body>
            </Media>
          </Card>
<<<<<<< HEAD
          <PostForm type="Solution" responsePostID={postID}/>
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
=======
          <PostForm type="Solution" responsePostID={postID} />
>>>>>>> 25138db... Lint react-views
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
  date: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageBefore: PropTypes.string.isRequired,
  imageAfter: PropTypes.string,
};

Post.defaultProps = {
  imageAfter: '',
};
