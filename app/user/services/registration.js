/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (option: any) => Promise<any>
 *  saveNewUser: (data: any) => Promise<any>
 * }} UserDB - user database object
 */
module.exports = (UserDB) => ({
  register: async (data) => {
    const { email } = data;
    const registeredUser = await UserDB.findSingleUser({ email });
    if (!registeredUser) {
      await UserDB.saveNewUser(data);
      return true;
    }
    return false;
  }
});
