import {
  POSTS_DOMAIN, MINE_DOMAIN, ALL_DOMAIN, POOL_DOMAIN,
  UPDATE, ADD,
} from '../../constants';
import {
  getPosts, publishPost, updatePostLike, getSinglePost,
} from './services';
import { updateStoreData } from '../util';
import { normalizePost, normalizePosts } from './schema';
import { addPopup } from '../ui/popups';
/**
 * @function updatePostFeedDomain : update post in MINE_DOMAIN / ALL_DOMAIN
 * @param {string} type : action type (UPDATE/ADD)
 * @param {string} subDomain : MINE_DOMAIN / ALL_DOMAIN
 * @param {string[]} postIDs : array of post ids
 */
function updatePostFeedDomain(type, feedDomain, postIDs) {
  return updateStoreData(type, postIDs, POSTS_DOMAIN, feedDomain);
}
function updatePostPoolDomain(postEntries) {
  return updateStoreData(UPDATE, postEntries, POSTS_DOMAIN, POOL_DOMAIN);
}
/**
 * @function- action that that get posts data
 * @param {string} author - author
 */
const getPostsAction = (author = '') => async (dispatch) => {
  try {
    const feedDomain = author ? MINE_DOMAIN : ALL_DOMAIN;
    const { data: posts } = await getPosts(author);
    const { postIDs, postEntries } = normalizePosts(posts);
    dispatch(updatePostFeedDomain(UPDATE, feedDomain, postIDs));
    dispatch(updatePostPoolDomain(postEntries));
  } catch (error) {
    let errorMessage = error;
    if (error && error.response) {
      errorMessage = error.response.data.toString();
    }
    dispatch(addPopup('Error in getting post', errorMessage));
  }
};
/**
 * @function getSinglePostAction : request a single post
 * @param {string} postID
 */
const getSinglePostAction = (postID) => async (dispatch, getState) => {
  try {
    const postPool = getState().posts[POOL_DOMAIN];
    const postData = postPool[postID];
    if (postData) {
      return postData;
    }
    const { data: post } = await getSinglePost(postID);
    const { postEntries } = normalizePost(post);
    dispatch(updatePostPoolDomain(postEntries));
    return post;
  } catch (error) {
    if (error && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
/**
 * @function publishPostAction : publish post
 * @param {string} postType - either 'Challenge' or 'Solution'
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 * @param {object} postData - post data
 */
const publishPostAction = (postType, responsePostID, postData) => async (dispatch) => {
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
    const {
      data: { challengePost, solutionPost },
    } = await publishPost(postType, responsePostID, data);
    [
      { post: challengePost, type: 'Challenge' },
      { post: solutionPost, type: 'Solution' },
    ].forEach(({ post, type }) => {
      if (!post) return;
      const { postID, postEntries } = normalizePost(post);
      dispatch(updatePostPoolDomain(postEntries));
      dispatch(updatePostFeedDomain(ADD, ALL_DOMAIN, [postID]));
      if (type === postType) {
        dispatch(updatePostFeedDomain(ADD, MINE_DOMAIN, [postID]));
      }
    });
  } catch (error) {
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};
/**
 * @function: toggle post like (like => unlike and vice versa)
 * @param {string} postID - post id for like update
 */
const updatePostLikeAction = (postID) => async (dispatch) => {
  try {
    const { data: post } = await updatePostLike(postID);
    const { postEntries } = normalizePost(post);
    dispatch(updatePostPoolDomain(postEntries));
  } catch (error) {
    let errorMessage = error;
    if (error && error.response) {
      errorMessage = error.response.data.toString();
    }
    dispatch(addPopup('Cannot like the post', errorMessage));
  }
};

export {
  getPostsAction, publishPostAction, updatePostLikeAction, getSinglePostAction,
};
