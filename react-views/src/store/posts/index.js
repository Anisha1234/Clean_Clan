<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
import {
  getPostsAction, publishPostAction, updatePostLikeAction,
} from './actions';
import PostReducer from './reducer';
<<<<<<< HEAD

export default PostReducer;
export {
  getPostsAction as getPosts,
  publishPostAction as publishPost,
  updatePostLikeAction as updatePostLike,
};
=======
import { combineReducers } from 'redux';
import { UPDATE, RESET } from '../../util';
import { isActionTypeEqual, getDomainsAndActionType } from '../util';
// domains
const POSTS_DOMAIN = 'posts';
const MY_POSTS_DOMAIN = 'my_posts';
const ALL_POSTS_DOMAIN = 'all_posts';
const PUBLISH_DOMAIN = 'publish';
// special actions on posts reducer
const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE';

const initialState = {
  my_posts: {
    status: '',
    message: '',
    data: [],
  },
  all_posts: {
    status: '',
    message: '',
    data: [],
  },
  publish: {
    status: '',
    message: '',
  },
};
/**
 * @function - to creat sub-reducers for posts reducer
 * @param {string} subDomain - either MY_POSTS_DOMAIN or ALL_POSTS_DOMAIN
 */
const createPostsSubReducer = (subDomain) => (state = initialState[subDomain], action) => {
  const { type, payload } = action;
  const { domains, actionType } = getDomainsAndActionType(type);
  if (!isActionTypeEqual([POSTS_DOMAIN, subDomain], domains)) return state;
  switch (actionType) {
    case UPDATE:
      return { ...state, ...payload };
    case RESET:
      return { ...state, ...initialState[subDomain] };
    case UPDATE_POST_LIKE: {
      const { postID, userID } = payload;
      return {
        ...state,
        data: state.data.map((post) => {
          if (post.id !== postID) return post;
          const userLikeIndex = post.likes.indexOf(userID);
          let newLikeArray = [];
          if (userLikeIndex === -1) {
            newLikeArray = [...post.likes, userID];
          } else {
            newLikeArray = post.likes.filter((likeID) => likeID !== userID);
          }
          return { ...post, likes: newLikeArray, like_count: newLikeArray.length };
        }),
      };
    }
    default: return state;
  }
};

const PostReducer = combineReducers({
  [MY_POSTS_DOMAIN]: createPostsSubReducer(MY_POSTS_DOMAIN),
  [ALL_POSTS_DOMAIN]: createPostsSubReducer(ALL_POSTS_DOMAIN),
  [PUBLISH_DOMAIN]: createPostsSubReducer(PUBLISH_DOMAIN),
});
=======
>>>>>>> cf60350... Refactor redux code to microservice structure

export default PostReducer;
export {
  getPostsAction as getPosts,
  publishPostAction as publishPost,
  updatePostLikeAction as updatePostLike,
};
<<<<<<< HEAD
export { UPDATE_POST_LIKE };

export default PostReducer;
>>>>>>> 5415bdb... restructure redux store
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
