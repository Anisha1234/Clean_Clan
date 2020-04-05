const PostShowHandlersInit = require('./PostShow');
/**
 * @function: create handlers for post routes
 * @param {{
 *  getSinglePost: (postID: string) => Promise<any>
 *  getMultiplePosts: (options: any) => Promise<any>
 * }}
 */
module.exports = (PostService) => {
  const PostShowHandlers = PostShowHandlersInit(PostService);
  return {
    PostShowHandlers
  }
}