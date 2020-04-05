const mongoose = require("mongoose");

/**
 * @function: create read stream to get a file from db
 * @param {GridFSBucket} fileStream: gridfs bucket stream
 * @return {function resolving a download stream} 
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


/**
 * @function: Database Object to manipulate with files
 * @param {Db} dbInstance: mongoDB instance
 */
module.exports = (dbInstance, bucketName)=>{
  const fileStream = new mongoose.mongo.GridFSBucket(dbInstance, {
    bucketName
  });
  return {
    getFile: getFile(fileStream)
  }
};

