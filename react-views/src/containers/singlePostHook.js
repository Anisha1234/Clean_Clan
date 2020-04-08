import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSinglePost } from '../store/posts';
import { PENDING, DONE, FAIL } from '../constants';
/**
 * @function useSinglePost: hook for request a post with post id
 * @param {string} postID
 * @return {{
 *  requestError: string
 *  requestStatus: string
 *  post: any
 * }}
 */
const useSinglePost = (postID) => {
  const [requestError, setRequestError] = useState('');
  const [requestStatus, setRequestStatus] = useState(PENDING);
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    setRequestStatus(PENDING);
    dispatch(getSinglePost(postID))
      .then((data) => {
        if (!isMounted) return;
        setPost(data);
        setRequestStatus(DONE);
      })
      .catch((error) => {
        if (!isMounted) return;
        setRequestError(error.toString());
        setRequestStatus(FAIL);
      });
    return () => {
      isMounted = false;
    };
  }, [dispatch, postID]);
  return {
    requestStatus,
    requestError,
    post,
  };
};

export default useSinglePost;
