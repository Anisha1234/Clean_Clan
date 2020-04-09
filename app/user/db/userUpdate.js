const UserModel = require('./userModel');
/**
 * @function saveNewUser
 * @param {object} data - signup data {name, email, user_details, password, city}
 * @return { Promise<any> } new user
 */
const saveNewUser = (data) => new Promise((resolve, reject) => {
  const newUser = new UserModel({
    ...data,
    image: {
      current: '',
      all: []
    },
    like_count: 0
  });
  newUser.save((error, user) => {
    if (error) reject(error);
    resolve(user);
  });
});
/**
 * @function updateUserImage
 * @param {string} userID
 * @param {string} imageName - the image that will become user current profile pic
 * @param {boolean} isNew - if imageName is new, the push in the image.all array
 * @return {Promise<{image: { current: string }}>}
 */
const updateUserImage = async (userID, imageName, isNew) => new Promise((resolve, reject) => {
  const updateQuery = {
    $set: {
      'image.current': imageName
    }
  };
  if (isNew) {
    updateQuery['$addToSet'] = {
      'image.all': imageName
    };
  }
  UserModel.findByIdAndUpdate(userID, updateQuery,
    { lean: true, new: true, projection: { 'image.current': 1 } }, (error, user) => {
      if (error || !user) {
        reject(error || new Error('Cannot find such user'));
      }
      resolve(user);
    }
  );
});
/**
 * @function updateUserData - update user data (not image / like_count)
 * @param {string} userID
 * @param {any} data
 * @return {Promise<any>}
 */
const updateUserData = async (userID, data) => new Promise((resolve, reject) => {
  const updateQuery = { $set: data };
  let includedFields = null;
  const fields = Object.keys(data);
  if (fields && fields.length) {
    includedFields = {};
    fields.forEach((key) => { includedFields[key] = 1; });
  }
  UserModel.findByIdAndUpdate(userID, updateQuery,
    { lean: true, new: true, projection: includedFields }, (error, user) => {
      if (error || !user) {
        reject(error || new Error('Cannot find such user'));
      }
      resolve(user);
    }
  );
});
/**
 * @function changeUserLikeCount - change user like_count by an amount
 * @param {string} userID
 * @param {number} amount
 * @return {Promise<{like_count: number}>}
 */
const changeUserLikeCount = async (userID, amount) => new Promise((resolve, reject) => {
  UserModel.findByIdAndUpdate(userID, { $inc: { like_count: amount } },
    { lean: true, new: true, projection: { like_count: 1 } }, (error, user) => {
      if (error || !user) {
        reject(error || new Error('Cannot find such user'));
      }
      resolve(user);
    }
  );
});

module.exports = {
  saveNewUser, updateUserImage, updateUserData, changeUserLikeCount
};
