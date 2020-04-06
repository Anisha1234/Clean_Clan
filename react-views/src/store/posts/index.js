import {
  getPostsAction, publishPostAction, updatePostLikeAction,
} from './actions';
import PostReducer from './reducer';

export default PostReducer;
export {
  getPostsAction as getPosts,
  publishPostAction as publishPost,
  updatePostLikeAction as updatePostLike,
};
