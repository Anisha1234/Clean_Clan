/**
 * @function  - sign-up handler
 * @param {{
 *  register: (data: {
 *    email: string, password: string, name: string, 
 *    user_details: string, city: string
 *  }) => Promise<boolean>
 * }} UserService
 */
module.exports = (UserService) => async (req, res) => {
  try{
    const isEmailValid = UserService.register(req.body);
    if(isEmailValid){
      res.status(200).send({
        message: "ok"
      });
      return;
    }
    res.status(200).send({
      error: "This email has been registerd!"
    });
  } catch(error){
    res.status(500).send(error.toString());
  }
};
