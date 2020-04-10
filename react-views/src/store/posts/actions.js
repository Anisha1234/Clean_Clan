import {
  POSTS_DOMAIN, ALL_POSTS_DOMAIN, MY_POSTS_DOMAIN, POSTS_POOL_DOMAIN,
  ADD_POSTS, UPDATE, RECEIVE_POSTS,
} from '../../constants';
import {
  getPosts, publishPost, updatePostLike, getSinglePost,
} from './services';
import { updateStoreDataAction } from '../util';
/**
 * @function updatePostsDataAction : update posts in subDomain
 * @param {string} subDomain : ALL_POSTS_DOMAIN / MY_POSTS_DOMAIN / POSTS_POOL_DOMAIN
 * @param {string} actionType :  UPDATE / ADD_POSTS / RECEIVE_POSTS
 * @param {any[]} data : array of post data (even partiaL data for UPDATE)
 */
function updatePostsDataAction(subDomain, actionType, data) {
  return updateStoreDataAction(actionType, data, POSTS_DOMAIN, subDomain);
}
/**
 * @function- action that that get posts data
 * @param {boolean} isMine - flag indicates whether data belongs to my_posts or all_posts
 */
const getPostsAction = (isMine) => async (dispatch, getState) => {
  const subDomain = isMine ? MY_POSTS_DOMAIN : ALL_POSTS_DOMAIN;
  try {
    const userID = (isMine ? getState().user.data.userid : '');
    const { data: posts } = await getPosts(userID);
    dispatch(updatePostsDataAction(subDomain, RECEIVE_POSTS, posts));
    dispatch(updatePostsDataAction(POSTS_POOL_DOMAIN, UPDATE, posts));
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
    const postPool = getState().posts[POSTS_POOL_DOMAIN];
    const postData = postPool[postID];
    if(postData && postData.id){
      return;
    }
    const { data } = await getSinglePost(postID);
    dispatch(updatePostsDataAction(POSTS_POOL_DOMAIN, UPDATE, [data]));
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
function publishPostAction(postType, responsePostID, postData) {
  return async (dispatch, getState) => {
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
      const currentUserID = getState().user.data.userid;
      [challengePost, solutionPost].forEach((post)=>{
        if(post && post.id){
          [MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN].forEach((subDomain) => {
            if( subDomain !== MY_POSTS_DOMAIN 
                || ( post.author && post.author.id === currentUserID )){
              dispatch(updatePostsDataAction(subDomain, ADD_POSTS, [post]));
            }
          });
          dispatch(updatePostsDataAction(POSTS_POOL_DOMAIN, UPDATE, [post]));
        }
      });
    } catch (error) {
      if (error && error.response) {
        throw error.response.data.toString();
      }
      throw error.toString();
    }
  };
}
/**
 *
 * @param {string} postID - post id for like update
 * @param {bool} likeStatus - true for "like", false for "unlike"
 */
const updatePostLikeAction = (postID, likeStatus) => async (dispatch) => {
  try{
    //update on server
    const { data } = await updatePostLike(postID, likeStatus);
    //update on feed
    [MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN].forEach((subDomain) => {
      dispatch(updatePostsDataAction(subDomain, UPDATE, [data]));
    });
    //update on pool
    dispatch(updatePostsDataAction(POSTS_POOL_DOMAIN, UPDATE, [data]));
  } catch(error){
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};

export {
  getPostsAction, publishPostAction, updatePostLikeAction, getSinglePostAction,
};
