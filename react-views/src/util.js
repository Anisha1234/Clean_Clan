import { SERVER_ROOT } from './constants';

export const dosth = () => {};

/**
 * @function createImageURL : create a file url with file name (apply for image as well)
 * @param {string} fileName
 */
const createImageURL = (imageName) => {
  if (imageName) return new URL(`images/${imageName}`, SERVER_ROOT);
  return '';
};
/**
 * @function: get user data at user.pool[userID][key1][key2][...]
 * @param {string} userID - userID of the author
 * @param  {...string} keys
 */
const getUserData = (userID, ...keys) => (state) => {
  if (!userID) {
    return null;
  }
  let data = state.user.pool[userID];
  keys.forEach((key) => {
    if (data) {
      data = data[key];
    }
  });
  return data;
};
/**
 * @function: get post data at posts.pool[postID][key1][key2][...]
 * @param {string} postID
 * @param  {...string} keys
 */
const getPostData = (postID, ...keys) => (state) => {
  if (!postID) {
    return null;
  }
  let data = state.posts.pool[postID];
  keys.forEach((key) => {
    if (data) {
      data = data[key];
    }
  });
  return data;
};

export {
  createImageURL, getPostData, getUserData,
};
