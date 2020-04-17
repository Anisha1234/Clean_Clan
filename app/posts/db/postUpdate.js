const PostModel = require('./postModel');
const {
  defaultProjection, createLikeArrayProjection
} = require('./util');
/**
 * @function updatePostData : update post
 * @param {string} postID
 * @param {object} updateQuery
 * @param {object} includedProjection:  included fields of the post
 * @param {object} excludedProjection: excluded fields of the post, override includedProjection
 */
const updatePost = (
  postID, updateQuery,
  includedProjection = defaultProjection,
  excludedProjection = {}
) => new Promise((resolve, reject) => {
  PostModel.findByIdAndUpdate(postID, updateQuery, {
    new: true,
    lean: true,
    projection: {
      ...includedProjection,
      ...excludedProjection
    }
  }, (error, post) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(post);
  });
});
/**
 * @function updatePostLike - update post like
 * @param {string} postID - post which is liked
 * @param {string} userID - user who interacts
 * @param {boolean} likeAction - true for like, false for unlike
 */
const updatePostLike = async (postID, userID, likeAction) => {
  const updateQuery = {
    [likeAction ? '$addToSet' : '$pull']: {
      likes: userID
    },
    $inc: {
      like_count: likeAction ? 1 : -1
    }
  };
  return updatePost(postID, updateQuery, {
    like_count: 1,
    author: 1,
    id: 1,
    ...createLikeArrayProjection(userID)
  });
};
/**
 * @function updatePostData : update post data (which not about "likes")
 * @param {string} postID
 * @param {object} newData
 * @param {string} userID : who request to update
 * @param {object} includedProjection
 * @param {object} excludedProjection
 */
const updatePostData = async (
  postID, newData,
  includedProjection = defaultProjection,
  excludedProjection = {}
) => updatePost(
  postID,
  { $set: newData },
  {
    ...includedProjection,
    ...excludedProjection
  },
  excludedProjection
);

/**
 * @function saveNewPost : save new post
 * @param {object} data
 */
const saveNewPost = (data) => new Promise((resolve, reject) => {
  const newPost = new PostModel({
    ...data,
    like_count: 0,
    likes: [],
    comments: []
  });
  newPost.save((error, post) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(post.toObject());
  });
});

module.exports = {
  saveNewPost, updatePostData, updatePostLike
};
