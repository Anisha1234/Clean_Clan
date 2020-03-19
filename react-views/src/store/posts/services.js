import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const getPosts = async (userID = '') => axios.get(
  `${SERVER_ROOT}/timeline/posts`,
  {
    params: {
      user_id: userID,
    },
    withCredentials: true,
  },
);

const publishPost = async (data, responsePostID) => {
  const endPoint = (responsePostID ? `/post/${responsePostID}/solve` : '/post/create');
  const postURL = new URL(endPoint, SERVER_ROOT);
  return axios.post(
    postURL,
    data,
    {
      withCredentials: true,
    },
  );
};

const updatePostLike = async (postID, likeStatus) => {
  const endPoint = likeStatus ? `/post/${postID}/like` : `/post/${postID}/unlike`;
  const updateLikeURL = new URL(endPoint, SERVER_ROOT);
  return axios.put(
    updateLikeURL,
    null,
    {
      withCredentials: true,
    },
  );
};

export {
  getPosts, publishPost, updatePostLike,
};
