import axios from 'axios';
import { serverRoot } from '../util';

const getPosts = async (userID = '') => axios.get(
  `${serverRoot}/timeline/posts`,
  {
    params: {
      user_id: userID,
    },
    withCredentials: true,
  },
);

const publishPost = async (data, responsePostID) => {
  const endPoint = (responsePostID ? `/post/${responsePostID}/solve` : '/post/create');
  const postURL = new URL(endPoint, serverRoot);
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
  const updateLikeURL = new URL(endPoint, serverRoot);
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
