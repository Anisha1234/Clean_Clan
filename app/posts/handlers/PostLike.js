/**
 * @function: create handler for post like
 * @param {{
 *  updatePostLike: (postID: string, userID: string) => Promise<{
      likes: string[];
      like_count: number;
      author: string;
    }>
 * }} PostService
 * @param {{
 *  changeUserLikeCount: (userID: any, amount: any) => Promise<{
      like_count: number;
    }>
 * }} UserService
 * @return { (req: Express.Request, res: Express.Response) => Promise<void> }
 */
module.exports = (PostService, UserService) => async (req, res) => {
  try {
    const postID = req.params && req.params.postID;
    const userID = req.session.userid;
    if (!postID || !userID) {
      res.status(404).send('Fail to interact with post');
      return;
    }
    // update post like
    const post = await PostService.updatePostLike(postID, userID);
    // for the author of this post => like_count +/-= 1
    await UserService.changeUserLikeCount(
      userID,
      (post.likes && post.likes.length && post.likes.indexOf(userID) !== -1 ? 1 : -1)
    );
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
