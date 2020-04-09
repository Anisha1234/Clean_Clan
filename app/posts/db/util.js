const defaultProjection = {
  date: 1,
  like_count: 1,
  heading: 1,
  description: 1,
  author: 1,
  location: 1,
  post_type: 1,
  image_before: 1,
  image_after: 1,
  solution: 1,
  challenge: 1
};

/**
 * @function createLikeArrayProjection : create a projection object for like array
 * @param {string} userID
 */
const createLikeArrayProjection = (userID) => ({
  likes: { $elemMatch: { $eq: userID } }
});

module.exports = {
  defaultProjection,
  createLikeArrayProjection
};
