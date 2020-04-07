import {
<<<<<<< HEAD
<<<<<<< HEAD
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA, UPDATE,
  PENDING, DONE, FAIL,
=======
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, PUBLISH_DOMAIN,
  UPDATE_POST_LIKE,
  PENDING, DONE, FAIL, UPDATE,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA, UPDATE,
  PENDING, DONE, FAIL,
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
} from '../../constants';
import { getPosts, publishPost, updatePostLike } from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function- shorthand action creator to update posts array (either my_posts or all_posts)
 * @param {string} subDomain either ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN or PUBLISH_DOMAIN
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {Object[]} data the posts array get from the server
 */
function updatePostsDataAction(subDomain, data) {
  return updateStoreDataAction(UPDATE_POST_DATA, data, POSTS_DOMAIN, subDomain);
=======
 * @param {string} status PENDING, DONE, FAIL
 * @param {string} message correspondent error/success message
 * @param {Object[]} data the posts array get from the server
 */
function updatePostsDataAction(subDomain, status, message, data) {
  return updateStoreDataAction(UPDATE, {
    status, message, data,
  }, POSTS_DOMAIN, subDomain);
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
 * @param {Object[]} data the posts array get from the server
 */
function updatePostsDataAction(subDomain, data) {
  return updateStoreDataAction(UPDATE_POST_DATA, data, POSTS_DOMAIN, subDomain);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
}

/**
 * @function- shorthand action creator to update user like in either my_posts or all_posts
 * @param {string} subDomain either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {string} postID - post id that user like that post
 * @param {string} userID - user id
=======
 * @param {*} postID - id that user like that post
 * @param {*} userID - id of the user
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
 * @param {string} postID - post id that user like that post
 * @param {string} userID - user id
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
 */
function updatePostLikeLocallyAction(subDomain, postID, userID) {
  return updateStoreDataAction(UPDATE_POST_LIKE, {
    postID, userID,
  }, POSTS_DOMAIN, subDomain);
}
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * @function: short hand action creator to update status in getting posts data
 * @param {string} subDomain - either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
 * @param {string} status - PENDING/DONE/FAIL
 */
function updatePostStatusAction(subDomain, status) {
  return updateStoreDataAction(UPDATE, {
    [subDomain]: status,
  }, POSTS_DOMAIN, POSTS_STATUS);
=======

=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
/**
 * @function: short hand action creator to update status in getting posts data
 * @param {string} subDomain - either ALL_POSTS_DOMAIN or MY_POSTS_DOMAIN
 * @param {string} status - PENDING/DONE/FAIL
 */
function updatePostStatusAction(subDomain, status) {
  return updateStoreDataAction(UPDATE, {
<<<<<<< HEAD
    status, message,
  }, POSTS_DOMAIN, PUBLISH_DOMAIN);
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    [subDomain]: status,
  }, POSTS_DOMAIN, POSTS_STATUS);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
}

/**
 * @func- action that that get posts data
 * @param {boolean} isMine - flag to indicate whether data belongs to my_posts or all_posts
 */
const getPostsAction = (isMine) => async (dispatch, getState) => {
  const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
  try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const userID = (isMine ? getState().user.data.userid : '');
    dispatch(updatePostStatusAction(subDomain, PENDING));
    const { data: posts } = await getPosts(userID);
    // reverse the posts that newest go first
    posts.reverse();
    dispatch(updatePostStatusAction(subDomain, DONE));
    dispatch(updatePostsDataAction(subDomain, posts));
    return;
  } catch (error) {
    dispatch(updatePostStatusAction(subDomain, FAIL));
=======
    dispatch(updatePostsDataAction(
      subDomain, PENDING, 'Waiting to get the posts', [],
    ));
    const { data: posts } = await getPosts(isMine);
=======
    const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
    const userID = (isMine ? getState().user.data.userid: '');
=======
    const userID = (isMine ? getState().user.data.userid : '');
>>>>>>> 25138db... Lint react-views
    dispatch(updatePostStatusAction(subDomain, PENDING));
    const { data: posts } = await getPosts(userID);
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
    // reverse the posts that newest go first
    posts.reverse();
    dispatch(updatePostStatusAction(subDomain, DONE));
    dispatch(updatePostsDataAction(subDomain, posts));
    return;
  } catch (error) {
<<<<<<< HEAD
    dispatch(updatePostsDataAction(
      subDomain, FAIL, error.toString(), [],
    ));
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    dispatch(updatePostStatusAction(subDomain, FAIL));
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  }
};

/**
 *
 * @param {object} postData - post data
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {string} postType - either 'Challenge' or 'Solution'
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postType, responsePostID, postData) => async () => {
=======
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postData, responsePostID = '') => async (dispatch) => {
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
 * @param {string} postType - either 'Challenge' or 'Solution'
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postType, responsePostID, postData) => async () => {
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  try {
    const data = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === 'images') {
<<<<<<< HEAD
<<<<<<< HEAD
        value.forEach((file) => {
=======
        value.forEach(({ file }) => {
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
        value.forEach((file) => {
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
          data.append('images', file);
        });
        return;
      }
      data.append(key, value);
    });
<<<<<<< HEAD
<<<<<<< HEAD
    await publishPost(postType, responsePostID, data);
  } catch (error) {
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
=======
    dispatch(updatePostPublishAction(PENDING, 'Your post is publishing...'));
    await publishPost(data, responsePostID);
    dispatch(updatePostPublishAction(DONE, 'Your post has succesfully been published...'));
  } catch (error) {
    dispatch(updatePostPublishAction(FAIL, `Publishing error: ${error.toString()}`));
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    await publishPost(postType, responsePostID, data);
  } catch (error) {
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
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
