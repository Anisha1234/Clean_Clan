import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Badge from 'react-bootstrap/Badge';
import { MdLocationOn } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { updatePostLikeAction } from '../store/posts';

const Post = ({
  postType, postID, author, date, heading,
  location, description, likeCount, likes,
  imageBefore, imageAfter,
}) => {
  const currentUserID = useSelector((state) => state.user.data.userid);
  const dispatch = useDispatch();
  const haveUserLiked = useMemo(
    () => likes.indexOf(currentUserID) > -1,
    [likes, currentUserID],
  );
  const updatePostLike = useCallback(() => {
    dispatch(updatePostLikeAction(postID, !haveUserLiked));
  }, [dispatch, haveUserLiked, postID]);
  return (
    <Card
      style={{ width: '90%', maxWidth: '520px' }}
      border="light"
    >
      <Card.Body>
        <Card.Title>{heading}</Card.Title>
        <Card.Subtitle>
          <Badge
            variant={postType === 'Challenge'
              ? 'danger' : 'success'}
          >
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
                <Card.Img src={imageBefore} />
              </Card>
            ) : null
          }
          {
            imageAfter ? (
              <Card border="light">
                <Card.Img src={imageAfter} />
              </Card>
            ) : null
          }
        </CardGroup>
        <Row
          className="justify-content-around"
          style={{
            paddingTop: '20px',
            cursor: 'pointer',
          }}
        >
          <button
            type="button"
            onClick={updatePostLike}
            style={{ border: 'none', background: 'transparent' }}
          >
            {
              haveUserLiked
                ? <FaHeart style={{ color: 'red' }} />
                : <FaRegHeart />
            }
            <Badge variant="info" pill>{likeCount}</Badge>
          </button>
          {
            postType === 'Challenge' && author !== currentUserID
              ? '' : null
          }

          <a href={`https://twitter.com/intent/tweet?text=${description}`}>
            <FaTwitter
              style={{
                fontSize: '20px',
                color: ' #38A1F3',
              }}
            />
          </a>
        </Row>
      </Card.Body>
    </Card>
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
