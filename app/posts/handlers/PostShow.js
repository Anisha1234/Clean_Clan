const { getAuthors } = require('./util');
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
    try{
      const { author } = req.query;
      const queryOptions = {};
      if(author) queryOptions.author = author;
      const posts = await PostService.getMultiplePosts(queryOptions);
      if(!posts || !posts.length){
        res.status(404).send("Not found!");
        return;
      }
      const authorObject =  await getAuthors(UserService, posts);
      for(let i = 0; i < posts.length; i += 1){
        const userID = posts[i].author
        posts[i].author = authorObject[userID];
      }
      res.status(200).send(posts);
    } catch(error){
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
    try{
      const postID = req.params.postID;
      if(!postID){
        res.status(404).send("Cannot find the post");
        return;
      }
      const post = await PostService.getSinglePost(postID);
      if(!post){
        res.status(404).send("Cannot find the post");
        return;
      }
      const authorObject =  await getAuthors(UserService, [post]);
      post.author = authorObject[post.author];
      res.status(200).send(post);
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
});