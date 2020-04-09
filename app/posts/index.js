const PostDB = require('./db');
const PostServiceInit = require('./services');
const PostHandlersInit = require('./handlers');
const PostRouteInit = require('./routes');
/**
 * @param {Multer} ImageUploadHandler - a middleware for image upload
 * @param {{
 *  getUserProfile: (userID: string) => Promise<any>
 *  updateUserProfile: (userID: string, newData: object) => Promise<any>
 * }} UserService - user service which is useful for some post handlers
 */
module.exports = (ImageUploadHandler, UserService) => {
  const PostService = PostServiceInit(PostDB);
  const {
    PostShowHandlers,
    PostLikeHandler,
    PublishHandlers
  } = PostHandlersInit(PostService, UserService);
  const PostRoute = PostRouteInit(
    ImageUploadHandler, PostShowHandlers, PostLikeHandler, PublishHandlers
  );
  return {
    PostRoute
  };
};
