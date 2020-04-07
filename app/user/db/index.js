<<<<<<< HEAD
const UserModel = require('./userModel');
=======
const UserModel = require("./userModel");
>>>>>>> 316f811... Finish user services, lint react-views

/**
 * @function findSingleUser find an user that match the options
 * @param {object} options - mongodb query filter
 */
<<<<<<< HEAD
<<<<<<< HEAD
const findSingleUser = (options) => new Promise((resolve, reject) => {
  UserModel.findOne(options, null, { lean: true }, (error, user) => {
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
=======
const findSingleUser = async (options)=> new Promise((resolve, reject)=>{
=======
const findSingleUser = (options)=> new Promise((resolve, reject)=>{
<<<<<<< HEAD
>>>>>>> 992e396... Allow user to upload profile picture
  UserModel.findOne(options, (error, user)=>{
=======
  UserModel.findOne(options, null, { lean: true }, (error, user)=>{
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
    if(error){
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
const saveNewUser = (data) => new Promise((resolve, reject)=>{
  const newUser = new UserModel({
    ...data,
    image: {
      current: '',
      all: []
    },
    like_count: 0
  });
  newUser.save((error, user)=>{
    if(error) reject(error);
<<<<<<< HEAD
>>>>>>> 316f811... Finish user services, lint react-views
    resolve(user);
=======
    resolve(user.toObject());
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  });
});
<<<<<<< HEAD

<<<<<<< HEAD
module.exports = {
  findSingleUser, saveNewUser, updateUserData
};
=======
=======
/**
 * 
 * @param {string} userID 
 * @param {object} data 
 */
const updateUserData = (userID, data) => new Promise((resolve, reject)=>{
  UserModel.findByIdAndUpdate(userID, {
    $set: data
  }, {
    lean: true,
    new: true
  }, (error, user)=>{
    if(error){
      reject(error);
      return;
    } 
    resolve(user);
  });
});
>>>>>>> 992e396... Allow user to upload profile picture

module.exports = {
  findSingleUser, saveNewUser, updateUserData
}
>>>>>>> 316f811... Finish user services, lint react-views
