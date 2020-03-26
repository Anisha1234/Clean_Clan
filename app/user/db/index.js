const UserModel = require("./userModel");

/**
 * @function findSingleUser find an user that match the options
 * @param {object} options - mongodb query filter
 */
const findSingleUser = (options)=> new Promise((resolve, reject)=>{
  UserModel.findOne(options, (error, user)=>{
    if(error){
      reject(error);
      return;
    } 
    if(user){
      resolve(user.toObject());
      return;
    } 
    resolve(null);
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
    resolve(user);
  });
});
/**
 * 
 * @param {string} userID 
 * @param {object} data 
 */
const updateUserData = (userID, data) => new Promise((resolve, reject)=>{
  UserModel.findByIdAndUpdate(userID, {
    $set: data
  }, {
    new: true
  }, (error, user)=>{
    if(error){
      reject(error);
      return;
    } 
    if(user){
      resolve(user.toObject());
      return;
    } 
    resolve(null);
  });
});

module.exports = {
  findSingleUser, saveNewUser, updateUserData
}
