const PostModel = require('./postModel');
const {
  defaultProjection, createLikeArrayProjection
} = require('./util');
/**
 * @function getPostByID : get a post by its unique id
 * @param {string} postID
 * @param {string} userID: who request that post
 * @param {object} includedProjection:  included fields of the post
 * @param {object} excludedProjection: excluded fields of the post, override includedProjection
 */
function getPostByID (
  postID, userID,
  includedProjection = defaultProjection,
  excludedProjection = {}
) {
  return new Promise((resolve, reject) => {
    PostModel.findById(postID, {
      ...includedProjection,
      ...excludedProjection,
      ...createLikeArrayProjection(userID)
    }, { lean: true }, (error, post) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(post);
    });
  });
}
/**
 * @function getPosts - get array of posts by a filter object
 * @param {object} obtions - filter object, could be null
 * @param {string} userID: id of the user that requests
 */
const getPosts = (options, userID) => new Promise((resolve, reject) => {
  PostModel.find(options,
    {
      ...defaultProjection,
      ...createLikeArrayProjection(userID)
    },
    { lean: true },
    (error, posts) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(posts);
    }
  );
});
module.exports = {
  getPostByID, getPosts
};
