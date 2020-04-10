import { combineReducers } from 'redux';
import {
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, POSTS_POOL_DOMAIN,
  UPDATE, ADD_POSTS, RECEIVE_POSTS,
} from '../../constants';
import {
  isActionTypeEqual,
  getDomainsAndActionType,
} from '../util';

const initialState = {
  my_posts: [],
  all_posts: [],
  pool: {},
};
/**
 * @function findPostWithId : find the index of the post with id
 * @param {any[]} postsArray 
 * @param {string} postID 
 * @return {number} : index of the post with postID in postsArray
 */
const findPostWithId = (postsArray, postID) => {
  if(!postID || !postsArray || !postsArray.length) return -1;
  return postsArray.findIndex((post)=>{
    if(post && post.id) return post.id === postID;
    return false;
  });
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
    case RECEIVE_POSTS:
      // reverse so latest go first
      return payload.reverse();
    case ADD_POSTS: {
      // add to the front
      return [
        ...payload.reverse().filter((post) => {
          const pIndex = findPostWithId(state, post.id);
          return pIndex === -1;
        }),
        ...state.map((post) => {
          const pIndex = findPostWithId(payload, post.id);
          if (pIndex === -1) return post;
          //update the old one with new data
          return {...post, ...payload[pIndex]};
        }),
      ];
    }
    case UPDATE:{
      return state.map((post) => {
        const pIndex = findPostWithId(payload, post.id);
        if(pIndex === -1) return post;
        //update the old one with new data
        return {...post, ...payload[pIndex]};
      });
    }
    default:
      return state;
  }
};

const PostReducer = combineReducers({
  [MY_POSTS_DOMAIN]: createPostsSubReducer(MY_POSTS_DOMAIN),
  [ALL_POSTS_DOMAIN]: createPostsSubReducer(ALL_POSTS_DOMAIN),
  [POSTS_POOL_DOMAIN]: (state = initialState[POSTS_POOL_DOMAIN], action) => {
    const { type, payload } = action;
    const { domains, actionType } = getDomainsAndActionType(type);
    if (!isActionTypeEqual([POSTS_DOMAIN, POSTS_POOL_DOMAIN], domains)) return state;
    switch(actionType){
      case UPDATE:{
        const newState =  {...state};
        payload.forEach((post)=>{
          if(post && post.id){
            newState[post.id] = {...newState[post.id], ...post};
          }
        });
        return newState;
      }
      default:
        return state;
    }
  },
});

export default PostReducer;
