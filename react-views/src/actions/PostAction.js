import {
  GET_POSTS_PENDING, GET_MY_POSTS_DONE, GET_ALL_POSTS_DONE,
} from '../utilities/constants';
import { getPosts } from '../services/PostService';

const updatePostsAction = (type, posts) => ({ type, posts });

const getMyPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch(updatePostsAction(GET_POSTS_PENDING, null));
    const currentUserID = getState().user.userid;
    if (!currentUserID) {
      throw new Error("Can't get your posts. Please reload to resolve the issue");
    }
    const posts = await getPosts(currentUserID);
    dispatch(updatePostsAction(GET_MY_POSTS_DONE, posts));
  } catch (e) {
    dispatch(updatePostsAction(GET_MY_POSTS_DONE, null));
    throw e;
  }
};

const getAllPostsAction = () => async (dispatch) => {
  try {
    dispatch(updatePostsAction(GET_POSTS_PENDING, null));
    const posts = await getPosts();
    dispatch(updatePostsAction(GET_ALL_POSTS_DONE, posts));
  } catch (e) {
    dispatch(updatePostsAction(GET_ALL_POSTS_DONE, null));
    throw e;
  }
};

export {
  getAllPostsAction, getMyPostsAction,
};
