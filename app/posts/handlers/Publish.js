const NEW_CHALLENGE_PRIZE = 5;
const NEW_SOLUTION_PRIZE = 15;
/**
 * @function refinePostData : add user data to post data
 * @param {object} postData
 * @param {object} userData
 * @param {Array} images
 */
const refinePostData = (postData, userData, images) => {
  const { userid: userID } = userData;
  return {
    ...postData,
    author: userID,
    image_before: images[0].filename,
    image_after: (images.length >= 2 ? images[1].filename : '')
  };
};
/**
 * @function: create handlers for post creation and update
 * @param {{
 *  createNewChallenge: (data: any) => Promise<any>
 *  createNewSolution: (data: any, challengeID: string, userID: string) => Promise<any>
 * }} PostService
 * @param {{
 *  changeUserLikeCount: (userID: any, amount: any) => Promise<{
 *    like_count: number;
 *  }>
 * }} UserService
 */
module.exports = (PostService, UserService) => ({
  /**
   * @function: handler for creating new challenge
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  ChallengeHandler: async (req, res) => {
    try {
      const postData = refinePostData(req.body, req.session, req.files);
      const challengePost = await PostService.createNewChallenge(postData);
      await UserService.changeUserLikeCount(req.session.userid, NEW_CHALLENGE_PRIZE);
      res.status(200).send({ challengePost });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  /**
   * @function: handler for create a solution to a challenge
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  SolutionHandler: async (req, res) => {
    try {
      const postData = refinePostData(req.body, req.session, req.files);
      const {
        challengePost,
        solutionPost
      } = await PostService.createNewSolution(
        postData, req.params.challengeID, req.session.userid
      );
      await UserService.changeUserLikeCount(req.session.userid, NEW_SOLUTION_PRIZE);
      res.status(200).send({ solutionPost, challengePost });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
});
