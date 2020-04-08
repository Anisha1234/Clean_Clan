import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const getPosts = async (userID = '') => axios.get(
  `${SERVER_ROOT}/posts/feed`,
  {
    params: {
      author: userID,
    },
    withCredentials: true,
  },
);

const getSinglePost = async (postID) => axios.get(
  `${SERVER_ROOT}/posts/show/${postID}`,
  {
    withCredentials: true
  }
);

const publishPost = async (postType, responsePostID, data) => {
  const endPoint = postType === 'Solution' && responsePostID
    ? `/posts/${responsePostID}/solution` : '/posts/challenge';
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
  const endPoint = likeStatus ? `posts/${postID}/like` : `posts/${postID}/unlike`;
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
  getPosts, getSinglePost, publishPost, updatePostLike
};
