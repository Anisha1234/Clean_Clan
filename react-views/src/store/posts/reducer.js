import { combineReducers } from 'redux';
import {
  UPDATE, RESET,
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, PUBLISH_DOMAIN,
  UPDATE_POST_LIKE,
} from '../../constants';
import { isActionTypeEqual, getDomainsAndActionType } from '../util';

const initialState = {
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

export default PostReducer;
