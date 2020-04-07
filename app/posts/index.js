const PostDB = require('./db');
const PostServiceInit = require('./services');
<<<<<<< HEAD
const PostHandlersInit = require('./handlers');
=======
const PostHandlersInit = require("./handlers");
>>>>>>> eebcc1e... create post component: post show service
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
<<<<<<< HEAD
<<<<<<< HEAD
  const {
    PostShowHandlers,
=======
  const { 
    PostShowHandlers, 
>>>>>>> 998de7b... update post component: like and publish services
    PostLikeHandler,
    PublishHandlers
  } = PostHandlersInit(PostService, UserService);
  const PostRoute = PostRouteInit(
<<<<<<< HEAD
    ImageUploadHandler,
    PostShowHandlers, PostLikeHandler, PublishHandlers
  );
  return {
    PostRoute
  };
};
=======
  const { PostShowHandlers } = PostHandlersInit(PostService);
  const PostRoute = PostRouteInit(ImageUploadHandler, PostShowHandlers);
=======
    ImageUploadHandler, 
    PostShowHandlers, PostLikeHandler, PublishHandlers
  );
>>>>>>> 998de7b... update post component: like and publish services
  return {
    PostRoute
  };
}
>>>>>>> eebcc1e... create post component: post show service
