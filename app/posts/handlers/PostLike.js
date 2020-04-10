/**
 * @function: create handler for post like
 * @param {{
 *  updatePostLike:
      (postID: string, userID: string, likeStatus: boolean) => Promise<{author: String}>
 * }} PostService
 * @param {{
 *  getUserProfile: (userID: string) => Promise<{like_count: number}>
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any>
 * }} UserService
 */
module.exports = function (PostService, UserService) {
  /**
   * @function: create handler for post like based on like action
   * @param {boolean} likeAction: true for like, false for unlike
   * @return { (req: Express.Request, res: Express.Response) => Promise<void> }
   * : a handler for the likeAction
   */
  const createLikeHandler = (likeAction) => async (req, res) => {
    try {
      const postID = req.params && req.params.postID;
      const userID = req.session.userid;
      if (!postID || !userID) {
        res.status(404).send('Fail to interact with post');
        return;
      }
      // update post like
      const {
        like_count, id, author
      } = await PostService.updatePostLike(postID, userID, likeAction);
      // for the author of this post => like_count +/-= 1
      const userData = await UserService.getUserProfile(author);
      const { like_count: currentAuthorLikeCount } = userData;
      await UserService.updateUserProfile(author, {
        like_count: currentAuthorLikeCount + (likeAction ? 1 : -1)
      });
      //return the updated post
      res.status(200).send({
        id,
        like_count,
        like_status: likeAction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  return createLikeHandler;
};
