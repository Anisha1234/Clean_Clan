const PostShowServicesInit = require("./PostShow");
/**
 * @function: create PostService
 * @param {{
 *  getPostByID: (postID: string) => Promise<any>
 *  getPosts: (options: object) => Promise<any>
 * }} PostDB - post db interface
 */
module.exports = (PostDB) => {
  const {
    getMultiplePosts, getSinglePost
  } = PostShowServicesInit(PostDB);
  return {
    getSinglePost, getMultiplePosts,
  }
}