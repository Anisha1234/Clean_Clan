const { getAuthors } = require('./util');

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
    image_after: (images.length >= 2 ? images[1].filename: '')
  }
}
/**
 * @function updateUserBonusPoint : increase user like_count with bonus point
 * @param {{
 *  getUserProfile: (userID: string, fields?: string[]) => Promise<{like_count: number}>
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any> 
 * }} UserService 
 * @param {string} userID 
 * @param {number} bonusPoint 
 */
const updateUserBonusPoint = async (UserService, userID, bonusPoint) => {
  const { 
    like_count: currentUserLikeCount 
  } = await UserService.getUserProfile(userID, ["like_count"]);
  await UserService.updateUserProfile(userID, {
    like_count: currentUserLikeCount + bonusPoint
  });
  return;
}
/**
 * @function: create handlers for post creation and update
 * @param {{
 *  createNewChallenge: (data: any) => Promise<any>
 *  createNewSolution: (data: any, challengeID: string) => Promise<any>
 * }} PostService
 * @param {{
 *  getUserProfile: (userID: string, fields?: string[]) => Promise<{like_count: number}>
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any> 
 * }} UserService 
 */
module.exports = (PostService, UserService) => ({
  /**
   * @function: handler for creating new challenge
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  ChallengeHandler : async (req, res) => {
    try{
      const postData = refinePostData(req.body, req.session, req.files);
      const savedPost = await PostService.createNewChallenge(postData);
      const authorObject = await getAuthors(UserService, [savedPost]);
      savedPost.author = authorObject[savedPost.author];
      await updateUserBonusPoint(UserService, req.session.userid, NEW_CHALLENGE_PRIZE);
      res.status(200).send(savedPost);
    } catch(error){
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
    try{
      const postData = refinePostData(req.body, req.session, req.files);
      const savedPost = await PostService.createNewSolution(postData, req.params.challengeID);
      const authorObject = await getAuthors(UserService, [savedPost]);
      savedPost.author = authorObject[savedPost.author];
      await updateUserBonusPoint(UserService, req.session.userid, NEW_SOLUTION_PRIZE);
      res.status(200).send(savedPost);
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
});