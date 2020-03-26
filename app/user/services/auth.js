const bcrypt = require("bcrypt");
const UserDB = require('../db');

/**
 * @function: compare password
 * @param {string} inputPassword - password in login request
 * @param {string} userPassword - hashed password saved in db
 */
function comparePassword(inputPassword, userPassword){
  return new Promise((resolve, reject)=>{
    bcrypt.compare(inputPassword, userPassword, (error, result)=>{
      if(error) reject(error);
      if(!result) reject(new Error("Incorrect password"));
      resolve();
    });
  });
} 

/**
 * @function: initiate session
 * @param {object} sessionObject - req.session
 * @param {object} userData 
 */
const createSession = (sessionObject, userData) => {
  //copy user data into req.session (automatically save in the database)
  Object.entries(userData).forEach(([key, value])=>{
    sessionObject[key] = value;
  });
  return new Promise((resolve, reject)=>{
    sessionObject.save((error)=>{
      if(error) reject(error);
      resolve();
    });
  });
}

/**
 * @function login
 * @param {string} email 
 * @param {string} password 
 */
const login = async (email, password)=>{
  const user = await UserDB.findSingleUser({email});
  if(!user){
    //user === null => User hasn't registerd
    return user;
  }
  await comparePassword(password, user.password);
  //password is highly confidential, should not be resolved
  user.password = null;
  return user;
};

/**
 * @function logout - destroy the current session
 * @param {object} sessionObject - req.session
 */
const logout = (sessionObject) => new Promise((resolve, reject)=>{
  sessionObject.destroy((error)=>{
    if(error) reject(error);
    resolve();
  });
});

module.exports = {
  login, logout, createSession
}