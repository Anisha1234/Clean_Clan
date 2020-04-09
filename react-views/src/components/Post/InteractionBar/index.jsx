import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import { updatePostLike } from '../../../store/posts';
import './style.css';

const InteractionBar = ({
  postID, currentUserID,
  description,
  likeCount, likes,
}) => {
  const [haveUserLiked, setHaveUserLiked] = useState(likes.indexOf(currentUserID) !== -1);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const dispatch = useDispatch();
  const togglePostLike = useCallback(() => {
    const currentLikeStatus = haveUserLiked;
    setHaveUserLiked(!currentLikeStatus);
    setCurrentLikeCount((c) => c + (currentLikeStatus ? -1 : 1));
    dispatch(updatePostLike(postID, !currentLikeStatus));
  }, [dispatch, postID, haveUserLiked]);

  return (
    <Row className="justify-content-around post-interaction-bar">
      <button type="button" className="hidden-btn" onClick={togglePostLike}>
        {haveUserLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        <Badge
          className="like-count-badge"
          variant="info"
          pill
        >
          {currentLikeCount}
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
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserID: PropTypes.string.isRequired,
};
