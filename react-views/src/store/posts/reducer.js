import { combineReducers } from 'redux';
import {
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN,
  UPDATE, UPDATE_POST_LIKE, ADD_POSTS,
} from '../../constants';
import {
  isActionTypeEqual,
  getDomainsAndActionType,
} from '../util';

const initialState = {
  [MY_POSTS_DOMAIN]: [],
  [ALL_POSTS_DOMAIN]: [],
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
      return payload;
    case ADD_POSTS:{
      return [
        ...state, 
        ...payload.filter((post)=>{
          const pIndex = state.findIndex((currentPost) => currentPost.id === post.id);
          if(pIndex === -1) return true;
          return false;
        })
      ];
    }
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
});

export default PostReducer;
