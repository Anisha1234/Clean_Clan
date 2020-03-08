/**
 *
 * @param {string} inputEmail - input email to be verified
 */
const validateEmail = (inputEmail) => {
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(inputEmail);
};

/**
 *
 * @param {Array} posts - array of posts
 * @param {string} postID - current post id for like update
 * @param {string} userID - user id that update like on current post
 * @return {Array} - the altered array of posts after update
 */
const updatePostLikeLocally = (posts, postID, userID) => {
  const resultPosts = [...posts];
  const postIndex = resultPosts.findIndex((post) => post.id === postID);
  if (postIndex === -1) {
    return resultPosts;
  }
  const userLikeIndex = resultPosts[postIndex].likes.indexOf(userID);
  if (userLikeIndex === -1) {
    resultPosts[postIndex].likes.push(userID);
    resultPosts[postIndex].like_count += 1;
    return resultPosts;
  }
  // delete the user's like in the likes array of the post.
  resultPosts[postIndex].likes.splice(userLikeIndex, 1);
  resultPosts[postIndex].like_count -= 1;
  return resultPosts;
};

export {
  validateEmail,
  updatePostLikeLocally,
};
