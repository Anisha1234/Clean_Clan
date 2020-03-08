import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePostLikeAction } from '../actions/PostAction';
import PostFormComponent from './PostFormComponent';

const PostComponent = ({
  postType, postID, author, date, heading, location, description, likeCount, likes,
}) => {
  const currentUserID = useSelector((state) => state.user.data.userid);
  const [haveUserLiked, setHaveUserLiked] = useState(likes.indexOf(currentUserID) > -1);
  const [isResponseFormOpen, setIsResponseFormOpen] = useState(false);
  const dispatch = useDispatch();
  const updatePostLike = useCallback(() => {
    dispatch(updatePostLikeAction(postID, !haveUserLiked));
    setHaveUserLiked(!haveUserLiked);
  }, [dispatch, haveUserLiked, postID]);
  return (
    <div>
      <p><strong>{postType}</strong></p>
      <h2>{heading}</h2>
      <p>{new Date(date).toLocaleString()}</p>
      <p>{location}</p>
      <p>{description}</p>
      <div>
        <p>{likeCount}</p>
        <button
          type="button"
          onClick={() => updatePostLike()}
        >
          {haveUserLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
      {
        postType === 'Challenge' && currentUserID !== author
          ? (
            <>
              <button
                type="button"
                onClick={() => setIsResponseFormOpen(!isResponseFormOpen)}
              >
                {isResponseFormOpen ? 'Close' : 'Solve this challenge'}
              </button>
              {
                isResponseFormOpen
                  ? (
                    <PostFormComponent
                      type="Solution"
                      responsePostID={postID}
                    />
                  ) : null
              }

            </>
          ) : null
      }
    </div>
  );
};

export default PostComponent;

PostComponent.propTypes = {
  postType: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string),
};

PostComponent.defaultProps = {
  likes: [],
};
