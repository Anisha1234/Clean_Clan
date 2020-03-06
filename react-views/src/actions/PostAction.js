import {
  POST_ACTION_DONE, POST_ACTION_PENDING,
  GET_MY_POSTS_DONE, GET_ALL_POSTS_DONE,
} from '../utilities/constants';
import { getPosts, publishPost } from '../services/PostService';

// only two types of status: POST_ACTION_DONE and POST_ACTION_PENDING allowed
const updatePostStatusAction = (type) => ({ type });
// this one only update the post data, not the status
const updatePostDataAction = (type, posts) => ({ type, posts });

const getMyPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch(updatePostStatusAction(POST_ACTION_PENDING));
    const currentUserID = getState().user.userid;
    if (!currentUserID) {
      dispatch(updatePostStatusAction(POST_ACTION_DONE));
      throw new Error("Can't get your posts. Please reload to resolve the issue");
    }
    const { data: posts } = await getPosts(currentUserID);
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_MY_POSTS_DONE, posts));
  } catch (e) {
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    dispatch(updatePostDataAction(GET_MY_POSTS_DONE, null));
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
    dispatch(updatePostDataAction(GET_ALL_POSTS_DONE, null));
    throw e;
  }
};

const publishPostAction = (
  postLocation, postType, postHeading,
  postDescription, stakeholders, uploadedImages,
) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append('location', postLocation);
    data.append('heading', postHeading);
    data.append('description', postDescription);
    data.append('stake_holders', stakeholders);
    data.append('type_post', postType);
    uploadedImages.forEach(({ file }) => {
      data.append('images', file);
    });
    dispatch(updatePostStatusAction(POST_ACTION_PENDING));
    const { data: message } = await publishPost(data);
    return message;
  } catch (error) {
    dispatch(updatePostStatusAction(POST_ACTION_DONE));
    throw error;
  }
};

export {
  getAllPostsAction, getMyPostsAction, publishPostAction,
};
