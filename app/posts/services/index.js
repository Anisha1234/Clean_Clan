<<<<<<< HEAD
const PostShowServicesInit = require('./PostShow');
const PostLikeServiceInit = require('./PostLike');
const PublishServiceInit = require('./Publish');
/**
 * @function: create PostService
 * @param {object} PostDB - post db interface
=======
const PostShowServicesInit = require("./PostShow");
const PostLikeServiceInit = require('./PostLike');
const PublishServiceInit = require('./Publish');
/**
 * @function: create PostService
<<<<<<< HEAD
 * @param {{
 *  getPostByID: (postID: string) => Promise<any>
 *  getPosts: (options: object) => Promise<any>
 * }} PostDB - post db interface
>>>>>>> eebcc1e... create post component: post show service
=======
 * @param {object} PostDB - post db interface
>>>>>>> 998de7b... update post component: like and publish services
 */
module.exports = (PostDB) => {
  const {
    getMultiplePosts, getSinglePost
  } = PostShowServicesInit(PostDB);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 998de7b... update post component: like and publish services
  const {
    updatePostLike
  } = PostLikeServiceInit(PostDB);
  const {
    createNewChallenge, createNewSolution
  } = PublishServiceInit(PostDB);
<<<<<<< HEAD
  return {
    getSinglePost,
    getMultiplePosts,
    updatePostLike,
    createNewChallenge,
    createNewSolution
  };
};
=======
  return {
    getSinglePost, getMultiplePosts,
  }
}
>>>>>>> eebcc1e... create post component: post show service
=======
  return {
    getSinglePost, getMultiplePosts, 
    updatePostLike, 
    createNewChallenge, createNewSolution
  };
}
>>>>>>> 998de7b... update post component: like and publish services
