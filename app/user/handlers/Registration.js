/**
 * @function  - sign-up handler
 * @param {{
 *  register: (data: {
<<<<<<< HEAD
 *    email: string, password: string, name: string,
=======
 *    email: string, password: string, name: string, 
>>>>>>> 15c5f0f... refactor user and files components
 *    user_details: string, city: string
 *  }) => Promise<boolean>
 * }} UserService
 */
module.exports = (UserService) => async (req, res) => {
<<<<<<< HEAD
  try {
    const isEmailValid = UserService.register(req.body);
    if (isEmailValid) {
      res.status(200).send({
        message: 'ok'
=======
  try{
    const isEmailValid = UserService.register(req.body);
    if(isEmailValid){
      res.status(200).send({
        message: "ok"
>>>>>>> 15c5f0f... refactor user and files components
      });
      return;
    }
    res.status(200).send({
<<<<<<< HEAD
      error: 'This email has been registerd!'
    });
  } catch (error) {
    console.log(error);
=======
      error: "This email has been registerd!"
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
