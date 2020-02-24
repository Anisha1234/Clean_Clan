/**
 * @param {{
 *  updatePostLike: (postID: string, userID: string, likeStatus: boolean) => Promise<any>
 * }} PostDB: post db object
 */
module.exports = (PostDB) => ({
  /**
   * @function: update post like
   * @param {string} postID - id of the post
   * @param {string} userID - id of user who interacts
   * @param {boolean} likeStatus: true for like, false for unlike
   */
  updatePostLike: async (postID, userID, likeStatus) => PostDB.updatePostLike(postID, userID, likeStatus)
});
