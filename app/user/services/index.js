const {login, logout, createSession} = require('./auth');
const {register} = require('./registration');
const {getUserProfile, updateUserImage} = require('./userProfile');

module.exports = {
  login, logout, createSession, 
  register,
  getUserProfile, updateUserImage
};