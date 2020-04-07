const NEW_CHALLENGE_PRIZE = 5;
const NEW_SOLUTION_PRIZE = 15;
/**
 * @function refinePostData : add user data to post data
<<<<<<< HEAD
 * @param {object} postData
 * @param {object} userData
 * @param {Array} images
 */
const refinePostData = (postData, userData, images) => {
  const {
    name: userName,
    userid: userID,
    image: { current: currentUserPic }
=======
 * @param {object} postData 
 * @param {object} userData 
 * @param {Array} images
 */
const refinePostData = (postData, userData, images) => {
  const { 
    name: userName, 
    userid: userID, 
    image: {current: currentUserPic} 
>>>>>>> 998de7b... update post component: like and publish services
  } = userData;
  return {
    ...postData,
    author: userID,
    author_name: userName,
    author_image: currentUserPic,
    image_before: images[0].filename,
<<<<<<< HEAD
    image_after: (images.length >= 2 ? images[1].filename : '')
  };
};
=======
    image_after: (images.length >= 2 ? images[1].filename: '')
  }
}
>>>>>>> 998de7b... update post component: like and publish services
/**
 * @function updateUserBonusPoint : increase user like_count with bonus point
 * @param {{
 *  getUserProfile: (userID: string) => Promise<{like_count: number}>
<<<<<<< HEAD
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any>
 * }} UserService
 * @param {string} userID
 * @param {number} bonusPoint
 */
const updateUserBonusPoint = async (UserService, userID, bonusPoint) => {
  const {
    like_count: currentUserLikeCount
=======
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any> 
 * }} UserService 
 * @param {string} userID 
 * @param {number} bonusPoint 
 */
const updateUserBonusPoint = async (UserService, userID, bonusPoint) => {
  const { 
    like_count: currentUserLikeCount 
>>>>>>> 998de7b... update post component: like and publish services
  } = await UserService.getUserProfile(userID);
  await UserService.updateUserProfile(userID, {
    like_count: currentUserLikeCount + bonusPoint
  });
<<<<<<< HEAD
};
=======
  return;
}
>>>>>>> 998de7b... update post component: like and publish services
/**
 * @function: create handlers for post creation and update
 * @param {{
 *  createNewChallenge: (data: any) => Promise<any>
 *  createNewSolution: (data: any, challengeID: string) => Promise<any>
 * }} PostService
 * @param {{
 *  getUserProfile: (userID: string) => Promise<{like_count: number}>
<<<<<<< HEAD
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any>
=======
 *  updateUserProfile: (userID: string, data: { like_count: number }) => Promise<any> 
>>>>>>> 998de7b... update post component: like and publish services
 * }} UserService
 */
module.exports = (PostService, UserService) => ({
  /**
   * @function: handler for creating new challenge
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
<<<<<<< HEAD
  ChallengeHandler: async (req, res) => {
    try {
      const postData = refinePostData(req.body, req.session, req.files);
      await PostService.createNewChallenge(postData);
      await updateUserBonusPoint(UserService, req.session.userid, NEW_CHALLENGE_PRIZE);
      res.status(200).send('ok');
    } catch (error) {
      console.log(error);
=======
  ChallengeHandler : async (req, res) => {
    try{
      const postData = refinePostData(req.body, req.session, req.files);
      await PostService.createNewChallenge(postData);
      await updateUserBonusPoint(UserService, req.session.userid, NEW_CHALLENGE_PRIZE);
      res.status(200).send("ok");
    } catch(error){
<<<<<<< HEAD
>>>>>>> 998de7b... update post component: like and publish services
=======
      console.log(error);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
      res.status(500).send(error);
    }
  },
  /**
   * @function: handler for create a solution to a challenge
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  SolutionHandler: async (req, res) => {
<<<<<<< HEAD
    try {
      const postData = refinePostData(req.body, req.session, req.files);
      await PostService.createNewSolution(postData, req.params.challengeID);
      await updateUserBonusPoint(UserService, req.session.userid, NEW_SOLUTION_PRIZE);
      res.status(200).send('ok');
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
});
=======
    try{
      const postData = refinePostData(req.body, req.session, req.files);
      await PostService.createNewSolution(postData, req.params.challengeID);
      await updateUserBonusPoint(UserService, req.session.userid, NEW_SOLUTION_PRIZE);
      res.status(200).send("ok");
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
});
>>>>>>> 998de7b... update post component: like and publish services
