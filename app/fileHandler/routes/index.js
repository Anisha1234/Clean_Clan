const express = require('express');
const FileDBInit = require('../db');
/**
 * @function: create a route for file download (or image show)
 * @param {Db} dbInstance: mongodb instance
 * @param {string} bucketName: mongodb collection from where we stream file
 */
module.exports = (dbInstance, bucketName)=>{
  const {getFile} = FileDBInit(dbInstance, bucketName);
  const router = express.Router();
  router
    //read an file
    .get('/:fileID', (req, res)=>{
      getFile(req.params.fileID)
        .then(fileReadStream => fileReadStream.pipe(res))
        .catch(error=> res.status(404).send(error));
    });
  return router;
}