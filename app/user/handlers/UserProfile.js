/**
 * @function: create user-profile handlers: get-profile, update-image, update-profile
 * @param {{
 *  getUserProfile: (userID: string, fields?: string[]) => Promise<any>
 *  updateUserImage:
 *    (userID: string, oldImageName: string, fileName: string) => Promise<any>
 *  updateUserProfile: (userID: string, newData: any) => Promise<any>
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
      const { userid: userID } = req.session;
      const userData = await UserService.getUserProfile(userID);
      res.status(200).send({
        message: 'ok',
        user_data: userData
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
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
      res.status(200).send({
        message: 'ok',
        user_data: user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  }
});
