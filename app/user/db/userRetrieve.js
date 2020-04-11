const UserModel = require('./userModel');
const {
  defaultIncludedFields
} = require('./util');

/**
 * @function findSingleUser find an user that match the options
 * @param {object} option - mongodb query filter
 */
const findSingleUser = (option) => new Promise((resolve, reject) => {
  UserModel.findOne(option, defaultIncludedFields, { lean: true }, (error, user) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(user);
  }
  );
});
/**
 * @function: get user password only for auth service
 * @param {any} option: mongodb filter object
 * @return {Promise<any>} full user data with the hashed password
 */
const getUserWithPassword = (option) => new Promise((resolve, reject) => {
  UserModel.findOne(option, { 'image.all': 0 }, { lean: true }, (error, user) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(user);
  });
});
/**
 * @function: get all user profile pics
 * @param {string} userID
 * @return {Promise<{ image: { all: string[] } }>} array contains all images
 */
const getAllUserPics = async (userID) => new Promise((resolve, reject) => {
  UserModel.findById(userID, { 'image.all': 1 }, { lean: true }, (error, user) => {
    if (error || !user) {
      reject(error || new Error('Cannot find user!'));
      return;
    }
    resolve(user);
  });
});
/**
 * @function: get user data with only name and image (for author display in post)
 * @param {string} userID
 * @return {Promise<{name: string, image: { current: string } }>}
 */
const getUserDataAsPostAuthor = async (userID) => new Promise((resolve, reject) => {
  UserModel.findById(userID, { name: 1, 'image.current': 1 },
    { lean: true }, (error, user) => {
      if (error || !user) {
        reject(error || new Error('Could not find user'));
        return;
      }
      resolve(user);
    });
});

module.exports = {
  findSingleUser, getUserWithPassword, getAllUserPics, getUserDataAsPostAuthor
};
