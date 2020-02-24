const PostShowServicesInit = require('./PostShow');
const PostLikeServiceInit = require('./PostLike');
const PublishServiceInit = require('./Publish');
/**
 * @function: create PostService
 * @param {object} PostDB - post db interface
 */
module.exports = (PostDB) => {
  const {
    getMultiplePosts, getSinglePost
  } = PostShowServicesInit(PostDB);
  const {
    updatePostLike
  } = PostLikeServiceInit(PostDB);
  const {
    createNewChallenge, createNewSolution
  } = PublishServiceInit(PostDB);
  return {
    getSinglePost,
    getMultiplePosts,
    updatePostLike,
    createNewChallenge,
    createNewSolution
  };
};
