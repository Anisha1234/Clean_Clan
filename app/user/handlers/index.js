const AuthHandlersInit = require('./Auth');
const RegistrationHandlerInit = require('./Registration');
const UserProfileHandlersInit = require('./UserProfile');
/**
 * @function: create handlers for user route
 * @param {object} UserService
 */
module.exports = (UserService) => ({
  AuthHandlers: AuthHandlersInit(UserService),
  RegistrationHandler: RegistrationHandlerInit(UserService),
  UserProfileHandlers: UserProfileHandlersInit(UserService)
});
