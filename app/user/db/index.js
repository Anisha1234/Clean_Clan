const UserModel = require('./userModel');

/**
 * @function findSingleUser find an user that match the options
 * @param {object} options - mongodb query filter
 * @param {string[]} fields - fields for projection
 */
const findSingleUser = (options, fields = []) => new Promise((resolve, reject) => {
  UserModel.findOne(options, fields.join(' '), { lean: true }, (error, user) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(user);
  });
});
/**
 *
 * @param {object} data - signup data {name, email, user_details, password, city}
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
    resolve(user.toObject());
  });
});
/**
 *
 * @param {string} userID
 * @param {object} data
 */
const updateUserData = (userID, data) => new Promise((resolve, reject) => {
  UserModel.findByIdAndUpdate(userID, {
    $set: data
  }, {
    lean: true,
    new: true
  }, (error, user) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(user);
  });
});

module.exports = {
  findSingleUser, saveNewUser, updateUserData
};
