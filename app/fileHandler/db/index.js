const GridStream = require("gridfs-stream");
const mongoose = require("mongoose");

/**
 * @function: create read stream to get a file from db
 * @param {GridStream} fileStream: gridfs stream
 * @return {function resolving a read stream} 
 * (later we pipe this read stream to response object in the request)
 */
const getFile = (fileStream) => (fileID) => new Promise((resolve, reject)=>{
  fileStream.files.findOne({_id: fileID}, (err, file)=>{
    if(err) 
      reject(err);
    if(!file || file.length===0) 
      reject(new Error("Cannot find the file"));
    resolve(
      fileStream.createReadStream({
        _id: fileID
      })
    );
  });
}); 


/**
 * @function: Database Object to manipulate with files
 * @param {Db} dbInstance: mongoDB instance
 */
module.exports = (dbInstance, bucketName)=>{
  const fileStream = GridStream(dbInstance, mongoose.mongo);
  fileStream.collection(bucketName);
  return {
    getFile: getFile(fileStream)
  }
};

