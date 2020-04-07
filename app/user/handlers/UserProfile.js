/**
 * @function: create user-profile handlers: get-profile, update-image, update-profile
 * @param {{
 *  getUserProfile: (userID: string) => Promise<any>
<<<<<<< HEAD
 *  updateUserImage:
=======
 *  updateUserImage: 
>>>>>>> 15c5f0f... refactor user and files components
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
<<<<<<< HEAD
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
=======
  GetHandler: async (req, res)=>{
    try{
      const {userid: userID} = req.session;
      const userData = await UserService.getUserProfile(userID);
      res.status(200).send({
        message: "ok", 
        user_data: userData
      });
    } catch(error){
<<<<<<< HEAD
>>>>>>> 15c5f0f... refactor user and files components
=======
      console.log(error);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
      res.status(500).send(error.toString());
    }
  },
  /**
   * @function: image-update handler
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
<<<<<<< HEAD
  ImageUpdateHandler: async (req, res) => {
    try {
=======
  ImageUpdateHandler: async (req, res)=>{
    try{
>>>>>>> 15c5f0f... refactor user and files components
      const oldImageName = req.body && req.body.oldImageName;
      const fileName = req.file && req.file.filename;
      const userID = req.session.userid;
      const user = await UserService.updateUserImage(userID, oldImageName, fileName);
      res.status(200).send({
<<<<<<< HEAD
        message: 'ok',
        user_data: user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  }
});
=======
        message: "ok",
        user_data: user
      });
    }catch(error){
      console.log(error);
      res.status(500).send(error.toString());
    }
  }
});
>>>>>>> 15c5f0f... refactor user and files components
