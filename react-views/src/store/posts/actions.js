import {
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, PUBLISH_DOMAIN,
  UPDATE_POST_LIKE,
  PENDING, DONE, FAIL, UPDATE,
} from '../../constants';
import { getPosts, publishPost, updatePostLike } from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function- shorthand action creator to update posts array (either my_posts or all_posts)
 * @param {string} subDomain either ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN or PUBLISH_DOMAIN
 * @param {string} status PENDING, DONE, FAIL
 * @param {string} message correspondent error/success message
 * @param {Object[]} data the posts array get from the server
 */
function updatePostsDataAction(subDomain, status, message, data) {
  return updateStoreDataAction(UPDATE, {
    status, message, data,
  }, POSTS_DOMAIN, subDomain);
}

/**
 * @function- shorthand action creator to update user like in either my_posts or all_posts
 * @param {string} subDomain either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
 * @param {*} postID - id that user like that post
 * @param {*} userID - id of the user
 */
function updatePostLikeLocallyAction(subDomain, postID, userID) {
  return updateStoreDataAction(UPDATE_POST_LIKE, {
    postID, userID,
  }, POSTS_DOMAIN, subDomain);
}

/**
 * @func - shorthand action creator that update data in publish domain
 * @param {string} status - DONE, FAIL, PENDING
 * @param {string} message - correspondent error/success message
 */
function updatePostPublishAction(status, message) {
  return updateStoreDataAction(UPDATE, {
    status, message,
  }, POSTS_DOMAIN, PUBLISH_DOMAIN);
}

/**
 * @func- action that that get posts data
 * @param {boolean} isMine - flag to indicate whether data belongs to my_posts or all_posts
 */
const getPostsAction = (isMine) => async (dispatch) => {
  const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
  try {
    dispatch(updatePostsDataAction(
      subDomain, PENDING, 'Waiting to get the posts', [],
    ));
    const { data: posts } = await getPosts(isMine);
    // reverse the posts that newest go first
    posts.reverse();
    dispatch(updatePostsDataAction(subDomain, DONE, '', posts));
    return;
  } catch (error) {
    dispatch(updatePostsDataAction(
      subDomain, FAIL, error.toString(), [],
    ));
  }
};

/**
 *
 * @param {object} postData - post data
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postData, responsePostID = '') => async (dispatch) => {
  try {
    const data = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach(({ file }) => {
          data.append('images', file);
        });
        return;
      }
      data.append(key, value);
    });
    dispatch(updatePostPublishAction(PENDING, 'Your post is publishing...'));
    await publishPost(data, responsePostID);
    dispatch(updatePostPublishAction(DONE, 'Your post has succesfully been published...'));
  } catch (error) {
    dispatch(updatePostPublishAction(FAIL, `Publishing error: ${error.toString()}`));
  }
};
/**
 *
 * @param {string} postID - post id for like update
 * @param {bool} likeStatus - true for "like", false for "unlike"
 */
const updatePostLikeAction = (postID, likeStatus) => (dispatch, getState) => {
  // first update locally
  const currentUserID = getState().user.user_data.data.userid;
  if (!currentUserID) {
    return;
  }
  dispatch(updatePostLikeLocallyAction(MY_POSTS_DOMAIN, postID, currentUserID));
  dispatch(updatePostLikeLocallyAction(ALL_POSTS_DOMAIN, postID, currentUserID));
  // then update on database
  updatePostLike(postID, likeStatus)
    .then()
    .catch();
};

export {
  getPostsAction, publishPostAction, updatePostLikeAction,
};
