<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const {login, logout, createSession} = require('./auth');
const {register} = require('./registration');
const {getUserProfile, updateUserImage} = require('./userProfile');

module.exports = {
  login, logout, createSession, 
  register,
<<<<<<< HEAD
  getUserProfile,
};
>>>>>>> 316f811... Finish user services, lint react-views
=======
  getUserProfile, updateUserImage
};
>>>>>>> 992e396... Allow user to upload profile picture
=======
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
    login, logout, createSession, 
    register,
    getUserProfile, updateUserImage, updateUserProfile
  }
}
>>>>>>> 15c5f0f... refactor user and files components
