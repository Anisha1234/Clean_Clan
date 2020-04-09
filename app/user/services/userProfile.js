/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (options: any, fields?: string[]) => Promise<any>
 *  updateUserData: (userID, data: any) => Promise<any>
 * }} UserDB - user database object
*/
module.exports = (UserDB) => ({
  /**
   * @function getUserProfile - get user profile
   * @param {string} userID - user id to update
   * @param {string[]} fields - fields to filter user profile data
   */
  getUserProfile: async (userID, fields = []) => UserDB.findSingleUser({ userid: userID }, fields),
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
