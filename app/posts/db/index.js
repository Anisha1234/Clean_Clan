const {
  getPostByID, getPosts
} = require('./postRetrieve');
const {
  updatePostData, updatePostLike, saveNewPost
} = require('./postUpdate');

module.exports = {
  getPostByID, getPosts, updatePostLike, updatePostData, saveNewPost
};
