import { combineReducers } from 'redux';
import {
<<<<<<< HEAD
<<<<<<< HEAD
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA,
  DONE,
} from '../../constants';
import {
  isActionTypeEqual,
  getDomainsAndActionType,
  createCommonSubreducer,
} from '../util';

const initialState = {
  [MY_POSTS_DOMAIN]: [],
  [ALL_POSTS_DOMAIN]: [],
  [POSTS_STATUS]: {
    [MY_POSTS_DOMAIN]: DONE,
    [ALL_POSTS_DOMAIN]: DONE,
=======
  UPDATE, RESET,
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, PUBLISH_DOMAIN,
  UPDATE_POST_LIKE,
=======
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA,
  DONE,
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
} from '../../constants';
import {
  isActionTypeEqual,
  getDomainsAndActionType,
  createCommonSubreducer,
} from '../util';

const initialState = {
<<<<<<< HEAD
  [MY_POSTS_DOMAIN]: {
    status: '',
    message: '',
    data: [],
  },
  [ALL_POSTS_DOMAIN]: {
    status: '',
    message: '',
    data: [],
  },
  [PUBLISH_DOMAIN]: {
    status: '',
    message: '',
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  [MY_POSTS_DOMAIN]: [],
  [ALL_POSTS_DOMAIN]: [],
  [POSTS_STATUS]: {
    [MY_POSTS_DOMAIN]: DONE,
    [ALL_POSTS_DOMAIN]: DONE,
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
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
<<<<<<< HEAD
<<<<<<< HEAD
    case UPDATE_POST_DATA:
      return [...state, ...payload];
    case UPDATE_POST_LIKE: {
      const { postID, userID } = payload;
      return state.map((post) => {
        if (post.id !== postID) return post;
        const userLikeIndex = post.likes.indexOf(userID);
        let newLikeArray = [];
        if (userLikeIndex === -1) {
          newLikeArray = [...post.likes, userID];
        } else {
          newLikeArray = post.likes.filter((likeID) => likeID !== userID);
        }
        return { ...post, likes: newLikeArray, like_count: newLikeArray.length };
      });
    }
    default:
      return state;
=======
    case UPDATE:
      return { ...state, ...payload };
    case RESET:
      return { ...state, ...initialState[subDomain] };
=======
    case UPDATE_POST_DATA:
      return [...state, ...payload];
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
    case UPDATE_POST_LIKE: {
      const { postID, userID } = payload;
      return state.map((post) => {
        if (post.id !== postID) return post;
        const userLikeIndex = post.likes.indexOf(userID);
        let newLikeArray = [];
        if (userLikeIndex === -1) {
          newLikeArray = [...post.likes, userID];
        } else {
          newLikeArray = post.likes.filter((likeID) => likeID !== userID);
        }
        return { ...post, likes: newLikeArray, like_count: newLikeArray.length };
      });
    }
<<<<<<< HEAD
    default: return state;
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    default:
      return state;
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  }
};

const PostReducer = combineReducers({
  [MY_POSTS_DOMAIN]: createPostsSubReducer(MY_POSTS_DOMAIN),
  [ALL_POSTS_DOMAIN]: createPostsSubReducer(ALL_POSTS_DOMAIN),
<<<<<<< HEAD
<<<<<<< HEAD
  [POSTS_STATUS]: createCommonSubreducer(POSTS_DOMAIN, POSTS_STATUS),
=======
  [PUBLISH_DOMAIN]: createPostsSubReducer(PUBLISH_DOMAIN),
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  [POSTS_STATUS]: createCommonSubreducer(POSTS_DOMAIN, POSTS_STATUS),
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
});

export default PostReducer;
