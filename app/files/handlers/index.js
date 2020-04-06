const FileUploadInit = require("./FileUpload");
const FileStreamInit = require("./FileStream");
/** 
 * @param {object} FileDB
 * @param {object} dbConfig: config object for mongodb connection
 * @param {string} bucketName: mongodb collection where we save file
 */
module.exports = (FileDB, dbConfig, bucketName) => ({
  FileUpload: FileUploadInit(dbConfig, bucketName),
  FileStream: FileStreamInit(FileDB)
});