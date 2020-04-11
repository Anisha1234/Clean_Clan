const {
  findSingleUser, getUserWithPassword, getAllUserPics, getUserDataAsPostAuthor
} = require('./userRetrieve');
const {
  saveNewUser,
  updateUserData, updateUserImage, changeUserLikeCount
} = require('./userUpdate');

module.exports = {
  findSingleUser,
  getUserWithPassword,
  getAllUserPics,
  getUserDataAsPostAuthor,
  saveNewUser,
  updateUserData,
  updateUserImage,
  changeUserLikeCount
};
