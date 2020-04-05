import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const postServiceURL = `${SERVER_ROOT}/posts`

const getPosts = async (isMine=false) => axios.get(
  `${postServiceURL}/feed`,
  {
    params: {
      isMine,
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
