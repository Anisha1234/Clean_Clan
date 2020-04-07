const PostShowHandlersInit = require('./PostShow');
<<<<<<< HEAD
<<<<<<< HEAD
const PostLikeHandlerInit = require('./PostLike');
const PublishHandlersInit = require('./Publish');
/**
 * @function: create handlers for post routes
 * @param {object} PostService
 * @param {object} UserService
 */
module.exports = (PostService, UserService) => {
  const PostShowHandlers = PostShowHandlersInit(PostService);
  const PostLikeHandler = PostLikeHandlerInit(PostService, UserService);
  const PublishHandlers = PublishHandlersInit(PostService, UserService);
  return {
    PostShowHandlers,
    PostLikeHandler,
    PublishHandlers
  };
};
=======
=======
const PostLikeHandlerInit = require('./PostLike');
const PublishHandlersInit = require('./Publish');
>>>>>>> 998de7b... update post component: like and publish services
/**
 * @function: create handlers for post routes
 * @param {object} PostService
 * @param {object} UserService
 */
module.exports = (PostService, UserService) => {
  const PostShowHandlers = PostShowHandlersInit(PostService);
  const PostLikeHandler = PostLikeHandlerInit(PostService, UserService);
  const PublishHandlers = PublishHandlersInit(PostService, UserService);
  return {
<<<<<<< HEAD
    PostShowHandlers
  }
}
>>>>>>> eebcc1e... create post component: post show service
=======
    PostShowHandlers,
    PostLikeHandler,
    PublishHandlers
  };
}
>>>>>>> 998de7b... update post component: like and publish services
