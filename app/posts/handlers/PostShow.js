
/**
 * @function: create a post show handler (get post(s))
 * @param {{
 *  getSinglePost: (postID: string) => Promise<any>
 *  getMultiplePosts: (options: any) => Promise<any>
 * }} PostService: post service
 */
module.exports = (PostService) => ({
  /**
   * @function: handler for a feed (contains multiple posts) request
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  FeedHandler: async (req, res) => {
    try{
      const isMine = req.query && req.query.isMine;
      const queryOptions = {};
      if(isMine){
        queryOptions.author = req.session.userid;
      }
      const posts = await PostService.getMultiplePosts(queryOptions);
      if(!posts || !posts.length){
        res.status(404).send("Not found!");
        return;
      }
      res.status(200).send(posts);
    } catch(error){
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
      res.status(200).send(post);
    } catch(error){
      res.status(500).send(error);
    }
  }
});