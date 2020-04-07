<<<<<<< HEAD
const mongoose = require('mongoose');
=======
const mongoose = require("mongoose");
>>>>>>> 15c5f0f... refactor user and files components

/**
 * @function: create read stream to get a file from db
 * @param {GridFSBucket} fileStream: gridfs bucket stream
<<<<<<< HEAD
<<<<<<< HEAD
 * @return { (fileName) => Promise<ReadableStream> }
 * (later we pipe this read stream to response object in the request)
 */
const getFile = (fileStream) => (fileName) => new Promise((resolve, reject) => {
  fileStream.find({ filename: fileName }).toArray((err, files) => {
    if (err) {
      reject(err);
      return;
    }
    // files here is the array, but because we find by id => files.length <=1
    // if files.length === 0 => cannot find the file
    if (!files || files.length === 0) {
      reject(new Error('Cannot find the file'));
      return;
    }
    resolve(fileStream.openDownloadStreamByName(fileName));
  });
});
=======
 * @return {function resolving a download stream} 
=======
 * @return { (fileName) => Promise<ReadableStream> } 
>>>>>>> 998de7b... update post component: like and publish services
 * (later we pipe this read stream to response object in the request)
 */
const getFile = (fileStream) => (fileName) => new Promise((resolve, reject)=>{
  fileStream.find({filename: fileName}).toArray((err, files)=>{
    if(err){
      reject(err);
      return;
    } 
    //files here is the array, but because we find by id => files.length <=1
    //if files.length === 0 => cannot find the file
    if(!files || files.length===0){
      reject(new Error("Cannot find the file"));
      return;
    } 
    resolve(fileStream.openDownloadStreamByName(fileName));
  });
}); 

>>>>>>> 15c5f0f... refactor user and files components

/**
 * @function: Database Object to manipulate with files
 * @param {Db} dbInstance: mongoDB instance
 */
<<<<<<< HEAD
module.exports = (dbInstance, bucketName) => {
=======
module.exports = (dbInstance, bucketName)=>{
>>>>>>> 15c5f0f... refactor user and files components
  const fileStream = new mongoose.mongo.GridFSBucket(dbInstance, {
    bucketName
  });
  return {
    getFile: getFile(fileStream)
<<<<<<< HEAD
  };
};
=======
  }
};

>>>>>>> 15c5f0f... refactor user and files components
