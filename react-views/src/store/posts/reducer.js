import { combineReducers } from 'redux';
import {
  POSTS_DOMAIN, MINE_DOMAIN, ALL_DOMAIN, POOL_DOMAIN,
  UPDATE, ADD,
} from '../../constants';
import {
  isActionTypeEqual,
  getDomainsAndActionType,
} from '../util';

const initialState = {
  mine: [], // array of postIds,
  all: [], // array of postIds
  pool: {}, // dictionary of posts (contains pairs [postID: postData])
};
/**
 * @function - to creat sub-reducers for posts reducer
 * @param {string} subDomain - either MY_POSTS_DOMAIN or ALL_POSTS_DOMAIN
 */
const createPostArrayReducer = (subDomain) => (state = initialState[subDomain], action) => {
  const { type, payload: postIDs } = action;
  const { domains, actionType } = getDomainsAndActionType(type);
  if (!isActionTypeEqual([POSTS_DOMAIN, subDomain], domains)) return state;
  postIDs.reverse();
  switch (actionType) {
    case UPDATE: return [...postIDs];
    case ADD:
      return [
        ...postIDs.filter((postID) => state.indexOf(postID) === -1),
        ...state,
      ];
    default: return state;
  }
};

const PostReducer = combineReducers({
  [MINE_DOMAIN]: createPostArrayReducer(MINE_DOMAIN),
  [ALL_DOMAIN]: createPostArrayReducer(ALL_DOMAIN),
  [POOL_DOMAIN]: (state = initialState[POOL_DOMAIN], action) => {
    const { type, payload: postEntries } = action;
    const { domains, actionType } = getDomainsAndActionType(type);
    if (!isActionTypeEqual([POSTS_DOMAIN, POOL_DOMAIN], domains)) return state;
    switch (actionType) {
      case UPDATE: {
        const newState = { ...state };
        Object.entries(postEntries).forEach(([postID, postData]) => {
          const currentData = state[postID];
          newState[postID] = { ...currentData, ...postData };
        });
        return newState;
      }
      default:
        return state;
    }
  },
});

export default PostReducer;
