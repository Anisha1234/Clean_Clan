import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../store/posts';
import { getUserAsPostAuthor } from '../store/user';
import { getUserData, getPostData } from '../util';
import { PENDING, DONE, FAIL } from '../constants';

/**
 * @function useSinglePost: hook for request a post with post id
 * @param {string} postID
 * @return {{
  *  requestError: string
  *  requestStatus: string
  *  post: any,
  *  authorName: string,
  *  authorImage: string
  * }}
  */
const useSinglePost = (postID) => {
  const [requestError, setRequestError] = useState('');
  const [requestStatus, setRequestStatus] = useState(PENDING);
  const post = useSelector(getPostData(postID));
  const authorUserID = useSelector(getPostData(postID, 'author'));
  const authorName = useSelector(getUserData(authorUserID, 'name'));
  const authorImage = useSelector(getUserData(authorUserID, 'image', 'current'));
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setRequestStatus(PENDING);
        await dispatch(getSinglePost(postID));
        if (!isMounted) return;
        setRequestStatus(DONE);
      } catch (error) {
        if (!isMounted) return;
        setRequestError(error.toString());
        setRequestStatus(FAIL);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [dispatch, postID]);
  useEffect(() => {
    if (authorUserID) {
      dispatch(getUserAsPostAuthor(authorUserID));
    }
  }, [dispatch, authorUserID]);
  return {
    requestStatus,
    requestError,
    post,
    authorName,
    authorImage,
  };
};

export default useSinglePost;
