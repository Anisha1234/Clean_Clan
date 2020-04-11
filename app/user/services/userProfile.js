/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (option: any) => Promise<any>
 *  updateUserImage: (userID: string, imageName: string, isNew: boolean) => Promise<{
      image: {
        current: string;
      }
    }>
 *  getAllUserPics: (userID: string) => Promise<{ image: { all: string[] } }>
 *  updateUserData: (userID: string, data: any) => Promise<any>
 *  changeUserLikeCount: (userID: string, amount: number) => Promise<{like_count: number}>
 *  getUserDataAsPostAuthor: (userID: string) => Promise<{name: string, image: { current: string}}>
 * }} UserDB - user database object
*/
module.exports = (UserDB) => ({
  /**
   * @function getUserProfile - get user profile
   * @param {string} userID - user id to update
   * @param {string[]} fields - fields to filter user profile data
   */
  getUserProfile: async (userID) => UserDB.findSingleUser({ _id: userID }),
  /**
   * @function: get user data for author display in post
   * @param {string} userID
   */
  getUserDataAsPostAuthor: async (userID) => UserDB.getUserDataAsPostAuthor(userID),
  /**
   * @function: get all user pics
   * @param {string} userID
   * @return {Promise<string[]>} array of images
   */
  getAllUserPics: async (userID) => UserDB.getAllUserPics(userID),
  /**
   * @function: update user profile image
   * @param {string} userID
   * @param {string} imageID : image id which is a user's old profile picture
   * @param {string} fileName : file id representing new uploaded profile picture
   */
  updateUserImage: async (userID, oldImageName, fileName) => {
    // if a file exist, then set it as profile pic
    if (fileName) {
      return UserDB.updateUserImage(userID, fileName, true);
    }
    // else set the old profile pic
    // check whether oldImageName is valid
    const { image: { all: allImages } } = await UserDB.getAllUserPics(userID);
    if (allImages && allImages.length && allImages.indexOf(oldImageName) !== -1) {
      return UserDB.updateUserImage(userID, oldImageName, false);
    }
    throw new Error('Cannot set user profile picture');
  },
  /**
   * @function updateUserProfile - update user profile that not image / like_count
   * @param {string} userID - user id
   * @param {object} newData - data to update (not image / like_count)
  */
  updateUserProfile: async (userID, newData) => UserDB.updateUserData(userID, newData),
  /**
   * @function changeUserLikeCount : change user like count by an amount
   * @param {string} userID
   * @param {number} amount
   */
  changeUserLikeCount: async (userID, amount) => UserDB.changeUserLikeCount(userID, amount),
  /**
   * @function updateSessionData: update data session after update user profile
   * @param {object} sessionObject: req.session
   * @param {object} userData
   */
  updateSessionData: async (sessionObject, userData) => new Promise((resolve, reject) => {
    Object.entries(userData).forEach(([key, value]) => {
      sessionObject[key] = value;
    });
    sessionObject.save((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  })
});
