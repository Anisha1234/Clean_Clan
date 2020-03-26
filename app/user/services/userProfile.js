const UserDB = require('../db');

const getUserProfile = async (userID) => UserDB.findSingleUser({userid: userID});

/**
 * @function: update user profile image
 * @param {string} userID 
 * @param {string} imageID : image id which is a user's old profile picture 
 * @param {*} fileID : file id representing new uploaded profile picture
 */
const updateUserImage = async (userID, oldImageName, fileName) => {
  const currentUser = await UserDB.findSingleUser({userid: userID});
  if(!currentUser){
    throw new Error("User not found");
  }
  const { image } = currentUser;
  //if a file exist, then set it as profile pic
  if(fileName){
    return UserDB.updateUserData(userID, {
      image: {
        current: fileName,
        all: [...image.all, fileName]
      }
    });
  }
  //else set the old profile pic
  if(image.current === oldImageName) return null;
  if(image.all.indexOf(oldImageName) === -1){
    throw new Error("Could not set this image as profile picture");
  }
  image.current = oldImageName;
  return UserDB.updateUserData(userID, { image });
};

module.exports = {
  getUserProfile, updateUserImage
}