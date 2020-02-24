const AuthServiceInit = require('./auth');
const RegistrationServiceInit = require('./registration');
const UserProfileServiceInit = require('./userProfile');

/**
 * @function: create auth services
 * @param {object} UserDB - user database object
 */
module.exports = (UserDB) => {
  const {
    login, logout, createSession
  } = AuthServiceInit(UserDB);
  const { register } = RegistrationServiceInit(UserDB);
  const {
    getUserProfile, updateUserImage, updateUserProfile
  } = UserProfileServiceInit(UserDB);
  return {
    login,
    logout,
    createSession,
    register,
    getUserProfile,
    updateUserImage,
    updateUserProfile
  };
};
