const express = require('express');
/**
 * @param {
<<<<<<< HEAD
<<<<<<< HEAD
    (req: Express.Request, res: Express.Response) => Promise<void>
  } FileStreamHandler
 */
module.exports = (FileStreamHandler) => {
  const router = express.Router();
  router
    // read an file
    .get('/:fileName', FileStreamHandler);
  return router;
};
=======
    (req: Express.Request, res: Response) => Promise<void>
=======
    (req: Express.Request, res: Express.Response) => Promise<void>
>>>>>>> 998de7b... update post component: like and publish services
  } FileStreamHandler
 */
module.exports = (FileStreamHandler)=>{
  const router = express.Router();
  router
    //read an file
    .get('/:fileName', FileStreamHandler);
  return router;
}
>>>>>>> 15c5f0f... refactor user and files components
