const UserModel = require("./userModel");

/**
 * @function findSingleUser find an user that match the options
 * @param {object} options - mongodb query filter
 */
const findSingleUser = async (options)=> new Promise((resolve, reject)=>{
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
const saveNewUser = async (data) => new Promise((resolve, reject)=>{
  const newUser = new UserModel({
    ...data,
    image: '',
    like_count: 0
  });
  newUser.save((error, user)=>{
    if(error) reject(error);
    resolve(user);
  });
});


module.exports = {
  findSingleUser, saveNewUser
}
