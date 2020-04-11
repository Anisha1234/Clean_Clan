/**
 * @param {{
 *  updatePostLike:
 *    (postID: string, userID: string, likeAction: boolean) => Promise<{
 *      likes: string[], like_count: number, author: string
 *    }>
 *  getPostByID: (
 *    postID: string, userID: string,
 *    includedProjection?: any,
 *    excludedProjection?: any
 *  ) => Promise<any>
 * }} PostDB: post db object
 */
module.exports = (PostDB) => ({
  /**
   * @function: update post like
   * @param {string} postID - id of the post
   * @param {string} userID - id of user who interacts
   * @param {boolean} likeStatus: true for like, false for unlike
   */
  updatePostLike: async (postID, userID) => {
    const { likes } = await PostDB.getPostByID(postID, userID, {});
    const likeAction = (!(likes && likes.length));
    const post = await PostDB.updatePostLike(postID, userID, likeAction);
    if (!post.likes) {
      post.likes = [];
    }
    return post;
  }
});
