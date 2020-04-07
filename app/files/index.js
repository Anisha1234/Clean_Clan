const FileDBInit = require('./db');
const FileHandlerInit = require('./handlers');
const FileRouteInit = require('./routes');
/**
 * @param {object} dbConfig : database config object for file upload middleware
 * @param {Db} dbInstance: mongodb instance for file stream route
 * @param {string} bucketName: buckeName for this file handler
 */
<<<<<<< HEAD
module.exports = (dbConfig, dbInstance, bucketName) => {
=======
module.exports = (dbConfig, dbInstance, bucketName)=>{
>>>>>>> 15c5f0f... refactor user and files components
  const FileDB = FileDBInit(dbInstance, bucketName);
  const { FileStream, FileUpload } = FileHandlerInit(FileDB, dbConfig, bucketName);
  return {
    FileUpload,
    FileRoute: FileRouteInit(FileStream)
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 15c5f0f... refactor user and files components
};
