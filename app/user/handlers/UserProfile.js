/**
 * @function: create user-profile handlers: get-profile, update-image, update-profile
 * @param {{
 *  getUserProfile: (userID: string) => Promise<any>
 *  getAllUserPics: (userID: string) => Promise<string[]>
 *  updateUserImage: (userID: string, oldImageName: string, fileName: string) => Promise<{
 *    image: { current: string }
 *  }>
 *  updateSessionData: (sessionObject: any, userData: any) => Promise<void>
 *  getUserDataAsPostAuthor: (userID: string) => Promise<{
      name: string;
      image: {
        current: string;
      };
    }>
 * }} UserService
 */
module.exports = (UserService) => ({
  /**
   * @function: get-profile handler
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  GetHandler: async (req, res) => {
    try {
      const userID = req.params.userID || req.session.userID;
      const userData = await UserService.getUserProfile(userID);
      res.status(200).send(userData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  },
  /**
   * @function: get user id to display author in post
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  GetAuthorDataHandler: async (req, res) => {
    try {
      const userID = req.params.userID || '';
      if (!userID) {
        res.status(404).send('Cannot find author data');
        return;
      }
      const authorData = await UserService.getUserDataAsPostAuthor(userID);
      res.status(200).send(authorData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  },
  /**
   * @function: handler to get all images from user
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  GetAllUserPicsHandler: async (req, res) => {
    try {
      const userID = req.params.userID || req.session.userid;
      if (!userID) {
        res.status(404).send('Cannot find those images');
        return;
      }
      const userData = await UserService.getAllUserPics(userID);
      res.status(200).send(userData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  /**
   * @function: image-update handler
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  ImageUpdateHandler: async (req, res) => {
    try {
      const oldImageName = req.body && req.body.oldImageName;
      const fileName = req.file && req.file.filename;
      const userID = req.session.userid;
      const user = await UserService.updateUserImage(userID, oldImageName, fileName);
      await UserService.updateSessionData(req.session, user);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  }
});
