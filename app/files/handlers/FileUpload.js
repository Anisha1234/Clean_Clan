const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

/**
 * @function: create a middleware for file upload
 * @param {object} dbConfig: config object for mongodb connection
 * @param {string} bucketName: mongodb collection where we save file
 */
<<<<<<< HEAD
module.exports = (dbConfig, bucketName) => {
  const { url, options } = dbConfig;
  const fileStorage = new GridFsStorage({
    url,
    options,
    file: () => {
      return {
        bucketName
      };
    }
  });
  return multer({ storage: fileStorage });
};
=======
module.exports = (dbConfig, bucketName) =>{
  let {url, options} = dbConfig;
  const fileStorage = new GridFsStorage({
    url,
    options,
    file: ()=>{
      return {
        bucketName
      }
    }
  });
  return multer({storage: fileStorage});
};  
>>>>>>> 15c5f0f... refactor user and files components
