<<<<<<< HEAD
const FileUploadInit = require('./FileUpload');
const FileStreamInit = require('./FileStream');
/**
 * @param {object} FileDB
=======
const FileUploadInit = require("./FileUpload");
const FileStreamInit = require("./FileStream");
/** 
<<<<<<< HEAD
 * @param {{
    getFile: (filename: string) =>  ReadableStream
  }} FileDB
>>>>>>> 15c5f0f... refactor user and files components
=======
 * @param {object} FileDB
>>>>>>> 998de7b... update post component: like and publish services
 * @param {object} dbConfig: config object for mongodb connection
 * @param {string} bucketName: mongodb collection where we save file
 */
module.exports = (FileDB, dbConfig, bucketName) => ({
  FileUpload: FileUploadInit(dbConfig, bucketName),
  FileStream: FileStreamInit(FileDB)
<<<<<<< HEAD
});
=======
});
>>>>>>> 15c5f0f... refactor user and files components
