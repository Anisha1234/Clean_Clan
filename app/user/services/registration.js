<<<<<<< HEAD
<<<<<<< HEAD
/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (options: any) => Promise<any>
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
=======
const UserDB = require('../db');
=======
>>>>>>> 15c5f0f... refactor user and files components
/**
 * @function signup user
 * @param {object} data : signup data {name, email, user_details, password, city}
 * @resolve {boolean}: true: register ok, false: email has been registered
 */
async function register(data){
  let {email} = data;
  const registeredUser = await UserDB.findSingleUser({email});
  if(!registeredUser){
    await UserDB.saveNewUser(data);
    return true;
  }
  return false;
}
<<<<<<< HEAD

module.exports = {register};
>>>>>>> 316f811... Finish user services, lint react-views
=======
/**
 * @function: create registration service
 * @param {{
 *  findSingleUser: (options: any) => Promise<any>
 *  saveNewUser: (data: any) => Promise<any>
 * }} UserDB - user database object
 */
module.exports = (UserDB) => ({
  register: async (data) => {
    let {email} = data;
    const registeredUser = await UserDB.findSingleUser({email});
    if(!registeredUser){
      await UserDB.saveNewUser(data);
      return true;
    }
    return false;
  }
})
>>>>>>> 15c5f0f... refactor user and files components
