import { combineReducers } from 'redux';
import {
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
  }
};

const PostReducer = combineReducers({
  [MY_POSTS_DOMAIN]: createPostsSubReducer(MY_POSTS_DOMAIN),
  [ALL_POSTS_DOMAIN]: createPostsSubReducer(ALL_POSTS_DOMAIN),
  [POSTS_STATUS]: createCommonSubreducer(POSTS_DOMAIN, POSTS_STATUS),
});

export default PostReducer;
