const PostShowHandlersInit = require('./PostShow');
const PostLikeHandlerInit = require('./PostLike');
const PublishHandlersInit = require('./Publish');
/**
 * @function: create handlers for post routes
 * @param {object} PostService
 * @param {object} UserService
 */
module.exports = (PostService, UserService) => {
  const PostShowHandlers = PostShowHandlersInit(PostService, UserService);
  const PostLikeHandler = PostLikeHandlerInit(PostService, UserService);
  const PublishHandlers = PublishHandlersInit(PostService, UserService);
  return {
    PostShowHandlers,
    PostLikeHandler,
    PublishHandlers
  };
};
