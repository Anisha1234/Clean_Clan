const fileUploadInit = require('./middlewares');
const fileRouteInit = require('./routes');
/**
 * @param {object} dbConfig : database config object for file upload middleware
 * @param {Db} dbInstance: mongodb instance for file stream route
 * @param {string} bucketName: buckeName for this file handler
 */
module.exports = (dbConfig, dbInstance, bucketName)=>({
  FileUpload: fileUploadInit(dbConfig, bucketName),
  FileRoute: fileRouteInit(dbInstance, bucketName)
});