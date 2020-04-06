import {
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA, UPDATE,
  PENDING, DONE, FAIL,
} from '../../constants';
import { getPosts, publishPost, updatePostLike } from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function- shorthand action creator to update posts array (either my_posts or all_posts)
 * @param {string} subDomain either ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN or PUBLISH_DOMAIN
 * @param {Object[]} data the posts array get from the server
 */
function updatePostsDataAction(subDomain, data) {
  return updateStoreDataAction(UPDATE_POST_DATA, data, POSTS_DOMAIN, subDomain);
}

/**
 * @function- shorthand action creator to update user like in either my_posts or all_posts
 * @param {string} subDomain either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
 * @param {string} postID - post id that user like that post
 * @param {string} userID - user id
 */
function updatePostLikeLocallyAction(subDomain, postID, userID) {
  return updateStoreDataAction(UPDATE_POST_LIKE, {
    postID, userID,
  }, POSTS_DOMAIN, subDomain);
}
/**
 * @function: short hand action creator to update status in getting posts data
 * @param {string} subDomain - either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
 * @param {string} status - PENDING/DONE/FAIL
 */
function updatePostStatusAction(subDomain, status) {
  return updateStoreDataAction(UPDATE, {
    [subDomain]: status,
  }, POSTS_DOMAIN, POSTS_STATUS);
}

/**
 * @func- action that that get posts data
 * @param {boolean} isMine - flag to indicate whether data belongs to my_posts or all_posts
 */
const getPostsAction = (isMine) => async (dispatch, getState) => {
  try {
    const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
    const userID = (isMine ? getState().user.data.userid: '');
    dispatch(updatePostStatusAction(subDomain, PENDING));
    const { data: posts } = await getPosts(userID);
    // reverse the posts that newest go first
    posts.reverse();
    dispatch(updatePostStatusAction(subDomain, DONE));
    dispatch(updatePostsDataAction(subDomain, posts));
    return;
  } catch (error) {
    dispatch(updatePostStatusAction(subDomain, FAIL));
  }
};

/**
 *
 * @param {object} postData - post data
 * @param {string} postType - either 'Challenge' or 'Solution'
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postType, responsePostID, postData) => async () => {
  try {
    const data = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file) => {
          data.append('images', file);
        });
        return;
      }
      data.append(key, value);
    });
    await publishPost(postType, responsePostID, data);
  } catch (error) {
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};
/**
 *
 * @param {string} postID - post id for like update
 * @param {bool} likeStatus - true for "like", false for "unlike"
 */
const updatePostLikeAction = (postID, likeStatus) => (dispatch, getState) => {
  // first update locally
  const currentUserID = getState().user.data.userid;
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
