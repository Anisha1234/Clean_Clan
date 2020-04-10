const { getAuthors } = require('./util');

/**
 * @function addLikeStatus : delete 'likes' property and 'like_status' property
 * @param {string} userID - current user id in the session
 * @param {{
 *  likes: string[],
 * }} post 
 */
const addLikeStatus = (userID, post) => {
  const nPost = post;
  const likeStatus = nPost.likes.indexOf(userID) !== -1;
  delete nPost.likes;
  nPost.like_status = likeStatus;
  return nPost;
}

/**
 * @function: create a post show handler (get post(s))
 * @param {{
 *  getSinglePost: (postID: string) => Promise<any>
 *  getMultiplePosts: (options: any) => Promise<any>
 * }} PostService: post service
 * @param {{
 *  getUserProfile : (userID: string, fields?: string[]) => Promise<any>
 * }} UserService: user service
 */
module.exports = (PostService, UserService) => ({
  /**
   * @function: handler for a feed (contains multiple posts) request
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  FeedHandler: async (req, res) => {
    try {
      const { author } = req.query;
      const queryOptions = {};
      if (author) queryOptions.author = author;
      const posts = await PostService.getMultiplePosts(queryOptions);
      if (!posts || !posts.length) {
        res.status(404).send('Not found!');
        return;
      }
      const authorObject = await getAuthors(UserService, posts);
      const currentUserID = req.session.userid;
      for (let i = 0; i < posts.length; i += 1) {
        posts[i] = addLikeStatus(currentUserID, posts[i]);
        const userID = posts[i].author;
        posts[i].author = userID && authorObject[userID];
      }
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  /**
   * @function: handler for a single post show
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  SinglePostHandler: async (req, res) => {
    try {
      const postID = req.params.postID;
      if (!postID) {
        res.status(404).send('Cannot find the post');
        return;
      }
      let post = await PostService.getSinglePost(postID);
      if (!post) {
        res.status(404).send('Cannot find the post');
        return;
      }
      const authorObject = await getAuthors(UserService, [post]);
      post = addLikeStatus(req.session.userid, post);
      post.author = post.author && authorObject[post.author];
      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
});
