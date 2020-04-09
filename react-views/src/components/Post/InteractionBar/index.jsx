import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import { updatePostLike } from '../../../store/posts';
import './style.css';

const InteractionBar = ({
  postID, description, likeCount, likes, currentUserID,
}) => {
  const dispatch = useDispatch();
  const likeStatus = useMemo(
    () => likes.indexOf(currentUserID) !== -1,
    [likes, currentUserID],
  );
  const togglePostLike = useCallback(() => {
    dispatch(updatePostLike(postID));
  }, [dispatch, postID]);
  return (
    <Row className="justify-content-around post-interaction-bar">
      <button type="button" className="hidden-btn" onClick={togglePostLike}>
        {likeStatus ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        <Badge
          className="like-count-badge"
          variant="info"
          pill
        >
          {likeCount}
        </Badge>
      </button>
      <a href={`https://twitter.com/intent/tweet?text=${description}`}>
        <FaTwitter style={{ fontSize: '20px', color: ' #38A1F3' }} />
      </a>
    </Row>
  );
};

export default InteractionBar;

InteractionBar.propTypes = {
  postID: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string),
  currentUserID: PropTypes.string.isRequired,
};
InteractionBar.defaultProps = {
  likes: [],
};
