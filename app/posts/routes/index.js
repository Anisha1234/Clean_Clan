const express = require("express");
/**
 * @function: create a post router
 * @param {Multer} ImageUploadHandler - middleware for image upload
 * @param {{
 *  FeedHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 *  SinglePostHandler: (req: Express.Request, res: Express.Response) => Promise<void>
 * }} PostShowHandlers
 */
module.exports = (ImageUploadHandler, PostShowHandlers)=>{
  const router = express.Router();
  const { FeedHandler, SinglePostHandler } = PostShowHandlers;
  router
    .get('/feed', FeedHandler)
    .get('/show/:postID', SinglePostHandler);
  return router;
}