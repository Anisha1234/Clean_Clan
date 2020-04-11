import { combineReducers } from 'redux';
import {
  PENDING,
  USER_DOMAIN, AUTH_DOMAIN, DATA_DOMAIN, POOL_DOMAIN,
  UPDATE, RESET, CHANGE_IMAGE, LOAD_IMAGES,
} from '../../constants';
import { isActionTypeEqual, getDomainsAndActionType } from '../util';

const initialState = {
  auth: {
    status: PENDING,
  },
  data: {
    userID: '',
  },
  pool: {
    '': {
      name: '',
      email: '',
      user_details: '',
      city: '',
      like_count: 0,
      image: {
        current: '',
        all: [],
      },
    },
  },
};

const createSubReducer = (subDomain) => (state = initialState[subDomain], action) => {
  const { type, payload } = action;
  const { domains, actionType } = getDomainsAndActionType(type);
  if (!isActionTypeEqual([USER_DOMAIN, subDomain], domains)) return state;
  switch (actionType) {
    case UPDATE:
      return { ...state, ...payload };
    case RESET:
      return { ...initialState[subDomain] };
    default:
      return state;
  }
};

const UserReducer = combineReducers({
  [AUTH_DOMAIN]: createSubReducer(AUTH_DOMAIN),
  [DATA_DOMAIN]: createSubReducer(DATA_DOMAIN),
  [POOL_DOMAIN]: (state = initialState[POOL_DOMAIN], action) => {
    const { type, payload: userEntries } = action;
    const { domains, actionType } = getDomainsAndActionType(type);
    if (!isActionTypeEqual([USER_DOMAIN, POOL_DOMAIN], domains)) return state;
    switch (actionType) {
      case UPDATE: {
        const newState = { ...state };
        Object.entries(userEntries).forEach(([userID, userData]) => {
          const combinedData = { ...state[userID], ...userData };
          newState[userID] = combinedData;
        });
        return newState;
      }
      case CHANGE_IMAGE: {
        const newState = { ...state };
        Object.entries(userEntries).forEach(([userID, userData]) => {
          const currentData = state[userID];
          const combinedData = {
            ...currentData,
            image: {
              ...currentData.image,
              current: userData.image.current,
            },
          };
          newState[userID] = combinedData;
        });
        return newState;
      }
      case LOAD_IMAGES: {
        const newState = { ...state };
        Object.entries(userEntries).forEach(([userID, userData]) => {
          const currentData = state[userID];
          const combinedData = {
            ...currentData,
            image: {
              ...currentData.image,
              all: [...currentData.image.all || [], ...userData.image.all || []],
            },
          };
          newState[userID] = combinedData;
        });
        return newState;
      }
      default: return state;
    }
  },
});

export default UserReducer;
