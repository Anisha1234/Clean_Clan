const UserDB = require('../db');
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

module.exports = {register};