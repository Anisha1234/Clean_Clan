<<<<<<< HEAD
const express = require('express');
const MAX_CHALLENGE_IMAGES_COUNT = 1;
const MAX_SOLUTION_IMAGES_COUNT = 2;
=======
const express = require("express");
<<<<<<< HEAD
>>>>>>> eebcc1e... create post component: post show service
=======
const MAX_CHALLENGE_IMAGES_COUNT = 1;
const MAX_SOLUTION_IMAGES_COUNT = 2;
>>>>>>> 998de7b... update post component: like and publish services
/**
 * @function: create a post router
 * @param {Multer} ImageUploadHandler - middleware for image upload
 * @param {{
 *  FeedHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  SinglePostHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 * }} PostShowHandlers
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 998de7b... update post component: like and publish services
 * @param { (likeAction: boolean)
 *  => (req: Express.Request, res: Express.Response)
 *  => Promise<void>
 * } PostLikeHandler
 * @param {{
 *  ChallengeHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  SolutionHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 * }} PublishHandlers
<<<<<<< HEAD
 */
module.exports = (
  ImageUploadHandler,
  PostShowHandlers,
  PostLikeHandler,
  PublishHandlers
) => {
  const router = express.Router();
  const { FeedHandler, SinglePostHandler } = PostShowHandlers;
  const { ChallengeHandler, SolutionHandler } = PublishHandlers;
  router
    .get('/feed', FeedHandler)
    .get('/show/:postID', SinglePostHandler)
    .put('/:postID/like', PostLikeHandler(true))
    .put('/:postID/unlike', PostLikeHandler(false))
    .post(
      '/challenge',
      ImageUploadHandler.array('images', MAX_CHALLENGE_IMAGES_COUNT),
      ChallengeHandler
    )
    .post(
      '/:challengeID/solution',
      ImageUploadHandler.array('images', MAX_SOLUTION_IMAGES_COUNT),
      SolutionHandler
    );
  return router;
};
=======
=======
>>>>>>> 998de7b... update post component: like and publish services
 */
module.exports = (
  ImageUploadHandler, 
  PostShowHandlers, 
  PostLikeHandler, 
  PublishHandlers
)=>{
  const router = express.Router();
  const { FeedHandler, SinglePostHandler } = PostShowHandlers;
  const { ChallengeHandler, SolutionHandler } = PublishHandlers;
  router
    .get('/feed', FeedHandler)
    .get('/show/:postID', SinglePostHandler)
    .put('/:postID/like', PostLikeHandler(true))
    .put('/:postID/unlike', PostLikeHandler(false))
    .post(
      '/challenge', 
      ImageUploadHandler.array('images', MAX_CHALLENGE_IMAGES_COUNT), 
      ChallengeHandler
    )
    .post(
      '/:challengeID/solution', 
      ImageUploadHandler.array('images', MAX_SOLUTION_IMAGES_COUNT),
      SolutionHandler
    );
  return router;
}
>>>>>>> eebcc1e... create post component: post show service
