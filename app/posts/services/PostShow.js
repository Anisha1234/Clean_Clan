/**
 * @param {{
 *  getPostByID: (postID: string) => Promise<any>
 *  getPosts: (options: object) => Promise<any>
 * }} PostDB - post db interface
 */
module.exports = (PostDB) => ({
  /**
   * @function: get single post by id
   * @param {string} postID - unique post id
   */
  getSinglePost: async (postID) => PostDB.getPostByID(postID),
  /**
   * @function: get multiple posts based on a filter query
   * @param {object} filter: filter query
   */
<<<<<<< HEAD
  getMultiplePosts: async (options = {}) => PostDB.getPosts(options)
});
=======
  getMultiplePosts: async (options={}) => PostDB.getPosts(options),
})
>>>>>>> eebcc1e... create post component: post show service
