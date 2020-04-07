/**
 * @function: create auth handlers: login, logout, auth-check
 * @param {{
 *  login: (email: string, password: string) => Promise<any>
 *  logout: (sessionObject: Express.Session) => Promise<any>
 *  createSession: (sessionObject: Express.Session) => Promise<any>
 * }} UserService
 */
<<<<<<< HEAD
module.exports = (UserService) => {
=======
module.exports = (UserService)=>{
>>>>>>> 15c5f0f... refactor user and files components
  /**
   * @function AuthCheck - Auth status check handler
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {object} next
   */
<<<<<<< HEAD
  const AuthCheck = (req, res, next) => {
    if (req.session && req.session.email) {
=======
  const AuthCheck = (req, res, next)=>{
    if(req.session && req.session.email){
>>>>>>> 15c5f0f... refactor user and files components
      next();
      return;
    }
    res.status(401).send("Unauthorized request: User hasn't logged in yet");
  };
  /**
   * @function LoginHandler - login handler
<<<<<<< HEAD
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  const LoginHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      if (!userData) {
=======
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */
  const LoginHandler = async (req, res) => {
    try{
      const {email, password} = req.body;
      const userData = await UserService.login(email, password);
      if(!userData){
>>>>>>> 15c5f0f... refactor user and files components
        return res.status(200).send({
          error: "This email hasn't been registerd yet"
        });
      }
      await UserService.createSession(req.session, userData);
      res.status(200).send({
<<<<<<< HEAD
        message: 'ok',
        user_data: userData
      });
      return;
    } catch (error) {
=======
        message: "ok",
        user_data: userData
      });
      return;
    }catch(error){
>>>>>>> 15c5f0f... refactor user and files components
      console.log(error);
      res.status(500).send(error.toString());
    }
  };
  /**
   * @function LogoutHandler - log-out handler
<<<<<<< HEAD
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  const LogoutHandler = async (req, res) => {
    try {
      await UserService.logout(req.session);
      res.status(200).send({
        message: 'ok'
      });
    } catch (error) {
      console.log(error);
=======
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   */
  const LogoutHandler =  async (req, res)=>{
    try{
      await UserService.logout(req.session);
      res.status(200).send({
        message: "ok"
      });
    } catch(error){
<<<<<<< HEAD
>>>>>>> 15c5f0f... refactor user and files components
=======
      console.log(error);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
      res.status(500).send(error.toString());
    }
  };
  return {
    AuthCheck, LoginHandler, LogoutHandler
<<<<<<< HEAD
  };
};
=======
  }
}

>>>>>>> 15c5f0f... refactor user and files components
