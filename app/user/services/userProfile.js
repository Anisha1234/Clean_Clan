<<<<<<< HEAD
<<<<<<< HEAD
/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (options: any) => Promise<any>
 *  updateUserData: (userID, data: any) => Promise<any>
 * }} UserDB - user database object
*/
module.exports = (UserDB) => ({
  /**
   * @function getUserProfile - get user profile
   * @param {string} userID - user id to update
   */
  getUserProfile: async (userID) => UserDB.findSingleUser({ userid: userID }),
  /**
   * @function: update user profile image
   * @param {string} userID
   * @param {string} imageID : image id which is a user's old profile picture
   * @param {string} fileName : file id representing new uploaded profile picture
   */
  updateUserImage: async (userID, oldImageName, fileName) => {
    const currentUser = await UserDB.findSingleUser({ userid: userID });
    if (!currentUser) {
      throw new Error('User not found');
    }
    const { image } = currentUser;
    // if a file exist, then set it as profile pic
    if (fileName) {
      return UserDB.updateUserData(userID, {
        image: {
          current: fileName,
          all: [...image.all, fileName]
        }
      });
    }
    // else set the old profile pic
    if (image.current === oldImageName) return null;
    if (image.all.indexOf(oldImageName) === -1) {
      throw new Error('Could not set this image as profile picture');
    }
    image.current = oldImageName;
    return UserDB.updateUserData(userID, { image });
  },
  /**
   * @function updateUserProfile - update user profile
   * @param {string} userID - user id
   * @param {{
      city: string,
      user_details: string,
      name: string,
      like_count: number
     }} newData - data to update
  */
  updateUserProfile: async (userID, newData) => UserDB.updateUserData(userID, newData)
});
=======
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
<<<<<<< HEAD
  getUserProfile
}
>>>>>>> 316f811... Finish user services, lint react-views
=======
  getUserProfile, updateUserImage
}
>>>>>>> 992e396... Allow user to upload profile picture
=======
/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (options: any) => Promise<any>
 *  updateUserData: (userID, data: any) => Promise<any>
 * }} UserDB - user database object
*/
module.exports = (UserDB) => ({
  /**
   * @function getUserProfile - get user profile
   * @param {string} userID - user id to update
   */
  getUserProfile: async (userID) => UserDB.findSingleUser({userid: userID}),
  /**
   * @function: update user profile image
   * @param {string} userID 
   * @param {string} imageID : image id which is a user's old profile picture 
   * @param {string} fileName : file id representing new uploaded profile picture
   */
  updateUserImage: async (userID, oldImageName, fileName) => {
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
  },
  /**
   * @function updateUserProfile - update user profile
   * @param {string} userID - user id
   * @param {{
      city: string,
      user_details: string,
      name: string,
      like_count: number
     }} newData - data to update
  */
  updateUserProfile: async (userID, newData) => UserDB.updateUserData(userID, newData)
});
>>>>>>> 15c5f0f... refactor user and files components
