const express = require('express');
const MAX_CHALLENGE_IMAGES_COUNT = 1;
const MAX_SOLUTION_IMAGES_COUNT = 2;
/**
 * @function: create a post router
 * @param {Multer} ImageUploadHandler - middleware for image upload
 * @param {{
 *  FeedHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  SinglePostHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 * }} PostShowHandlers
 * @param {(req: Express.Request, res: Express.Response) => Promise<void>} PostLikeHandler
 * @param {{
 *  ChallengeHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  SolutionHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 * }} PublishHandlers
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
    .put('/:postID/like', PostLikeHandler)
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
