const {login, logout, createSession} = require('./auth');
const {register} = require('./registration');
const {getUserProfile} = require('./userProfile');

module.exports = {
  login, logout, createSession, 
  register,
  getUserProfile,
};