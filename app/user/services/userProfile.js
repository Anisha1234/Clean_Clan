const UserDB = require('../db');

const getUserProfile = async (userID) => UserDB.findSingleUser({userid: userID});

module.exports = {
  getUserProfile
}