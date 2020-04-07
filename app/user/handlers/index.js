const AuthHandlersInit = require('./Auth');
const RegistrationHandlerInit = require('./Registration');
const UserProfileHandlersInit = require('./UserProfile');
/**
 * @function: create handlers for user route
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {object} UserService
=======
 * @param {{
 *  login: (email: string, password: string) => Promise<any>
 *  logout: (sessionObject: Express.Session) => Promise<any>
 *  createSession: (sessionObject: Express.Session) => Promise<any>
 *  register: (data: {
 *    email: string, password: string, name: string, 
 *    user_details: string, city: string
 *  }) => Promise<boolean>  
 *  getUserProfile: (userID: string) => Promise<any>
 *  updateUserImage: 
 *    (userID: string, oldImageName: string, fileName: string) => Promise<any>
 *  updateUserProfile: (userID: string, newData: any) => Promise<any>
 * }} UserService
>>>>>>> 15c5f0f... refactor user and files components
=======
 * @param {object} UserService
>>>>>>> 998de7b... update post component: like and publish services
 */
module.exports = (UserService) => ({
  AuthHandlers: AuthHandlersInit(UserService),
  RegistrationHandler: RegistrationHandlerInit(UserService),
  UserProfileHandlers: UserProfileHandlersInit(UserService)
<<<<<<< HEAD
});
=======
})
>>>>>>> 15c5f0f... refactor user and files components
