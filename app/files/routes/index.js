const express = require('express');
/**
 * @param {
    (req: Express.Request, res: Response) => Promise<void>
  } FileStreamHandler
 */
module.exports = (FileStreamHandler)=>{
  const router = express.Router();
  router
    //read an file
    .get('/:fileName', FileStreamHandler);
  return router;
}