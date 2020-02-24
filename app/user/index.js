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
