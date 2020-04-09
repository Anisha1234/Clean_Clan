const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

/**
 * @function: create a middleware for file upload
 * @param {object} dbConfig: config object for mongodb connection
 * @param {string} bucketName: mongodb collection where we save file
 */
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
