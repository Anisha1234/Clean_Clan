import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const getPosts = async (author = '') => axios.get(
  `${SERVER_ROOT}/posts/feed`,
  {
    params: {
      author,
    },
    withCredentials: true,
  },
);

const getSinglePost = async (postID) => axios.get(
  `${SERVER_ROOT}/posts/show/${postID}`,
  {
    withCredentials: true,
  },
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

const updatePostLike = async (postID) => {
  const updateLikeURL = new URL(`posts/${postID}/like`, SERVER_ROOT);
  return axios.put(
    updateLikeURL,
    null,
    {
      withCredentials: true,
    },
  );
};

export {
  getPosts, getSinglePost, publishPost, updatePostLike,
};
