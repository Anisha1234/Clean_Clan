<<<<<<< HEAD
<<<<<<< HEAD
const UserDB = require('./db');
const UserServiceInit = require('./services');
const UserRouteInit = require('./routes');
const UserHandlersInit = require('./handlers');

/**
 * @param {Multer} ImageUploadHandler: image upload middleware, useful for user profile pic update
 */
module.exports = (ImageUploadHandler) => {
  const UserService = UserServiceInit(UserDB);
  const {
    AuthHandlers,
    RegistrationHandler,
    UserProfileHandlers
  } = UserHandlersInit(UserService);
  const { AuthCheck } = AuthHandlers;
  const UserRoute = UserRouteInit(
    ImageUploadHandler, AuthHandlers,
    RegistrationHandler, UserProfileHandlers
  );
  return {
    UserService,
    AuthCheck,
    UserRoute
  };
};
=======
const UserService = require('./services');
=======
const UserDB = require('./db');
const UserServiceInit = require('./services');
>>>>>>> 15c5f0f... refactor user and files components
const UserRouteInit = require('./routes');
const UserHandlersInit = require('./handlers');

/**
 * @param {Multer} ImageUploadHandler: image upload middleware, useful for user profile pic update
 */
<<<<<<< HEAD
module.exports = (ImageUpload) => ({
  UserService,
<<<<<<< HEAD
  UserRoute: UserRouteInit()
});
>>>>>>> 316f811... Finish user services, lint react-views
=======
  UserRoute: UserRouteInit(ImageUpload)
});
>>>>>>> 992e396... Allow user to upload profile picture
=======
module.exports = (ImageUploadHandler) => {
  const UserService = UserServiceInit(UserDB);
  const { 
    AuthHandlers, 
    RegistrationHandler, 
    UserProfileHandlers 
  } = UserHandlersInit(UserService);
  const { AuthCheck } = AuthHandlers;
  const UserRoute = UserRouteInit(
    ImageUploadHandler, AuthHandlers, 
    RegistrationHandler, UserProfileHandlers
  );
  return {
    UserService,
    AuthCheck,
    UserRoute,
  };
}
>>>>>>> 15c5f0f... refactor user and files components
