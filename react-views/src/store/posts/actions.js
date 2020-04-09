import {
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN,
  UPDATE_POST_LIKE, ADD_POSTS, UPDATE,
} from '../../constants';
import {
  getPosts, publishPost, updatePostLike, getSinglePost,
} from './services';
import { updateStoreDataAction } from '../util';

function updatePostsDataAction(subDomain, data) {
  return updateStoreDataAction(UPDATE, data, POSTS_DOMAIN, subDomain);
}
/**
 * @function addPostsDataAction : add array of posts in subDomain
 * @param {string} subDomain: either ALL_POSTS_DOMAIN / MY_POSTS_DOMAIN
 * @param {any[]} data
 */
function addPostsDataAction(subDomain, data) {
  return updateStoreDataAction(ADD_POSTS, data, POSTS_DOMAIN, subDomain);
}

function updatePostLikeLocallyAction(subDomain, postID, userID) {
  return updateStoreDataAction(UPDATE_POST_LIKE, {
    postID, userID,
  }, POSTS_DOMAIN, subDomain);
}
/**
 * @function- action that that get posts data
 * @param {boolean} isMine - flag to indicate whether data belongs to my_posts or all_posts
 */
const getPostsAction = (isMine) => async (dispatch, getState) => {
  const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
  try {
    const userID = (isMine ? getState().user.data.userid : '');
    const { data: posts } = await getPosts(userID);
    dispatch(updatePostsDataAction(subDomain, posts));
    return;
  } catch (error) {
    if (error && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
/**
 * @function getSinglePostAction : request a single post
 * @param {string} postID
 */
const getSinglePostAction = (postID) => async (dispatch, getState) => {
  try {
    const postsState = getState().posts;
    let postsArray;
    let postIndex = -1;
    [MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN].forEach((subDomain) => {
      if (postIndex !== -1) return;
      postsArray = postsState[subDomain];
      postIndex = postsArray.findIndex((post) => post.id === postID);
    });
    if (postIndex === -1) {
      const { data } = await getSinglePost(postID);
      dispatch(addPostsDataAction(ALL_POSTS_DOMAIN, [data]));
      return data;
    }
    return postsArray[postIndex];
  } catch (error) {
    if (error && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * @function publishPostAction : publish post
 * @param {object} postData - post data
 * @param {string} postType - either 'Challenge' or 'Solution'
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
function publishPostAction(postType, responsePostID, postData){
  return async (dispatch) => {
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
      const { data: post } = await publishPost(postType, responsePostID, data);
      [MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN].forEach((subDomain) => {
        dispatch(addPostsDataAction(subDomain, [post]));
      });
    } catch (error) {
      if (error && error.response) {
        throw error.response.data.toString();
      }
      throw error.toString();
    }
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
  getPostsAction, publishPostAction, updatePostLikeAction, getSinglePostAction,
};
