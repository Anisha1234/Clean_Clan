/**
 * @function: create auth handlers: login, logout, auth-check
 * @param {{
 *  login: (email: string, password: string) => Promise<any>
 *  logout: (sessionObject: Express.Session) => Promise<any>
 *  createSession: (sessionObject: Express.Session) => Promise<any>
 * }} UserService
 */
module.exports = (UserService) => {
  /**
   * @function AuthCheck - Auth status check handler
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {object} next
   */
  const AuthCheck = (req, res, next) => {
    if (req.session && req.session.email) {
      next();
      return;
    }
    res.status(401).send("Unauthorized request: User hasn't logged in yet");
  };
  /**
   * @function LoginHandler - login handler
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  const LoginHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      if (!userData) {
        return res.status(200).send({
          error: "This email hasn't been registerd yet"
        });
      }
      await UserService.createSession(req.session, userData);
      res.status(200).send({
        message: 'ok',
        user_data: userData
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  };
  /**
   * @function LogoutHandler - log-out handler
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
      res.status(500).send(error.toString());
    }
  };
  return {
    AuthCheck, LoginHandler, LogoutHandler
  };
};
