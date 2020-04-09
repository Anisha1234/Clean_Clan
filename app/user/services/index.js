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
    getUserProfile, getUserDataAsPostAuthor,
    getAllUserPics, updateUserProfile, updateUserImage,
    changeUserLikeCount,
    updateSessionData
  } = UserProfileServiceInit(UserDB);
  return {
    login,
    logout,
    createSession,
    register,
    getUserProfile,
    getAllUserPics,
    getUserDataAsPostAuthor,
    updateUserProfile,
    updateSessionData,
    updateUserImage,
    changeUserLikeCount
  };
};
