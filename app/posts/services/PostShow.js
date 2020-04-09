/**
 * @param {{
 *  getPostByID: (
 *    postID: string, userID: string,
 *    includedProjection?: any,
 *    excludedProjection?: any
 *  ) => Promise<any>
 *  getPosts: (options: object, userID: string) => Promise<any>
 * }} PostDB - post db interface
 */
module.exports = (PostDB) => ({
  /**
   * @function: get single post by id
   * @param {string} postID - unique post id
   * @param {string} userID - id of the current user
   */
  getSinglePost: async (postID, userID) => PostDB.getPostByID(postID, userID),
  /**
   * @function: get multiple posts based on a filter query
   * @param {object} filter: filter query
   * @param {string} userID - id of the current user
   */
  getMultiplePosts: async (options = {}, userID) => PostDB.getPosts(options, userID)
});
