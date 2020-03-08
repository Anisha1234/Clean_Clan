import {
  POST_ACTION_DONE, POST_ACTION_PENDING,
  GET_MY_POSTS_DONE, GET_ALL_POSTS_DONE,
} from '../utilities/constants';
import { getPosts, publishPost, updatePostLike } from '../services/PostService';
import { updatePostLikeLocally } from '../utilities/helpers';

// only two types of status: POST_ACTION_DONE and POST_ACTION_PENDING allowed
const updatePostStatusAction = (type) => ({ type });
// this one only update the post data, not the status
const updatePostDataAction = (type, posts) => ({ type, posts });


const getMyPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch(updatePostStatusAction(POST_ACTION_PENDING));
    const currentUserID = getState().user.data.userid;
    if (!currentUserID) {
      dispatch(updatePostStatusAction(POST_ACTION_DONE));
      throw new Error("Can't get your posts. Maybe you haven't signed in yet");
    }
    const { data: posts } = await getPosts(currentUserID);
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_MY_POSTS_DONE, posts));
  } catch (e) {
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_MY_POSTS_DONE, []));
    throw e;
  }
};

const getAllPostsAction = () => async (dispatch) => {
  try {
    dispatch(updatePostStatusAction(POST_ACTION_PENDING));
    const { data: posts } = await getPosts();
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_ALL_POSTS_DONE, posts));
  } catch (e) {
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_ALL_POSTS_DONE, []));
    throw e;
  }
};

/**
 *
 * @param {object} postData - post data
 * @param {string} responsePostID - the post ID this uploaded post responds to.
 */
const publishPostAction = (postData, responsePostID) => async (dispatch) => {
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
    dispatch(updatePostStatusAction(POST_ACTION_PENDING));
    const { data: message } = await publishPost(data, responsePostID);
    return message;
  } catch (error) {
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    throw error;
  }
};
/**
 *
 * @param {string} postID - post id for like update
 * @param {bool} likeStatus - true for "like", false for "unlike"
 */
const updatePostLikeAction = (postID, likeStatus) => (dispatch, getState) => {
  // first update locally
  const { my_posts: myPosts, all_posts: allPosts } = getState().posts;
  const userID = getState().user.data.userid;
  dispatch(updatePostDataAction(
    GET_ALL_POSTS_DONE,
    [...updatePostLikeLocally(allPosts, postID, userID)],
  ));
  dispatch(updatePostDataAction(
    GET_MY_POSTS_DONE,
    [...updatePostLikeLocally(myPosts, postID, userID)],
  ));
  // then update on database
  updatePostLike(postID, likeStatus);
};

export {
  getAllPostsAction, getMyPostsAction, publishPostAction, updatePostLikeAction,
};
