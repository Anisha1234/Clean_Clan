const express = require('express');
/**
 * @param {Multer} ImageUploadHander: image upload middleware for user profile pic update
 * @param {{
 *  LoginHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  LogoutHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  AuthCheck: (req: Express.Request, res: Express.Response) => void
 * }} AuthHandlers: handlers for auth services
 * @param { (req: Express.Request, res: Express.Response) => Promise<void> } RegistrationHandler
 * - handler for registration service
 * @param {{
 *  GetHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  ImageUpdateHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  GetAllUserPicsHandler: (req: Express.Request, res: Express.Request) => Promise<void>
 *  GetAuthorDataHandler: (req: Express.Request, res: Express.Request) => Promise<void>
 * }} UserProfileHandlers - handlers for user-profile services
 */
module.exports = (
  ImageUploadHandler, AuthHandlers,
  RegistrationHandler, UserProfileHandlers
) => {
  const router = express.Router();
  const { AuthCheck, LoginHandler, LogoutHandler } = AuthHandlers;
  const {
    GetHandler: GetProfileHandler,
    ImageUpdateHandler: UserPicUpdateHandler,
    GetAllUserPicsHandler, GetAuthorDataHandler
  } = UserProfileHandlers;
  router
    // check user auth status
    .get('/', AuthCheck, (req, res) => {
      res.status(200).send({
        message: 'User is logged in',
        user_data: {
          _id: req.session['_id'],
          name: req.session.name,
          image: req.session.image
        }
      });
    })
    // login
    .post('/login', LoginHandler)
    // logout
    .get('/logout', LogoutHandler)
    // register
    .post('/signup', RegistrationHandler)
    // get user profile
    .get('/profile/:userID', AuthCheck, GetProfileHandler)
    .get('/author/:userID', AuthCheck, GetAuthorDataHandler)
    // update user profile image
    .post('/profile/image', AuthCheck, ImageUploadHandler.single('image'), UserPicUpdateHandler)
    .get('/profile/image/all/:userID', AuthCheck, GetAllUserPicsHandler);
  return router;
};
