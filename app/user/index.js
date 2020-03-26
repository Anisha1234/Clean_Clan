const UserService = require('./services');
const UserRouteInit = require('./routes');

/**
 * @param {Multer} ImageUpload: image upload middleware, useful for user profile pic update
 */
module.exports = (ImageUpload) => ({
  UserService,
  UserRoute: UserRouteInit(ImageUpload)
});