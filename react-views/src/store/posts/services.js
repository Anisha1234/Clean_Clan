import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const getPosts = async (userID = '') => axios.get(
<<<<<<< HEAD
  `${SERVER_ROOT}/posts/feed`,
  {
    params: {
      author: userID,
=======
  `${SERVER_ROOT}/timeline/posts`,
  {
    params: {
      user_id: userID,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
const postServiceURL = `${SERVER_ROOT}/posts`

const getPosts = async (isMine=false) => axios.get(
  `${postServiceURL}/feed`,
  {
    params: {
      isMine,
>>>>>>> eebcc1e... create post component: post show service
=======
const getPosts = async (userID='') => axios.get(
=======
const getPosts = async (userID = '') => axios.get(
>>>>>>> 25138db... Lint react-views
  `${SERVER_ROOT}/posts/feed`,
  {
    params: {
      author: userID,
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
    },
    withCredentials: true,
  },
);

<<<<<<< HEAD
<<<<<<< HEAD
const publishPost = async (postType, responsePostID, data) => {
  const endPoint = postType === 'Solution' && responsePostID
    ? `/posts/${responsePostID}/solution` : '/posts/challenge';
=======
const publishPost = async (data, responsePostID) => {
  const endPoint = (responsePostID ? `/post/${responsePostID}/solve` : '/post/create');
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
const publishPost = async (postType, responsePostID, data) => {
  const endPoint = postType === 'Solution' && responsePostID
    ? `/posts/${responsePostID}/solution` : '/posts/challenge';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
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
<<<<<<< HEAD
<<<<<<< HEAD
  const endPoint = likeStatus ? `posts/${postID}/like` : `posts/${postID}/unlike`;
=======
  const endPoint = likeStatus ? `/post/${postID}/like` : `/post/${postID}/unlike`;
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  const endPoint = likeStatus ? `posts/${postID}/like` : `posts/${postID}/unlike`;
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
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
