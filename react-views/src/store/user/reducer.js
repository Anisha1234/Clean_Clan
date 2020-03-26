import { combineReducers } from 'redux';
import {
  PENDING, UPDATE, RESET,
  USER_DOMAIN, AUTH_DOMAIN, REGISTRATION_DOMAIN, USER_DATA_DOMAIN,
} from '../../constants';
import { isActionTypeEqual, getDomainsAndActionType } from '../util';

const initialState = {
  auth: {
    status: PENDING,
    message: '',
  },
  registration: {
    status: '',
    message: '',
  },
  data: {
    user_id: '',
    name: '',
    like_count: 0,
    user_details: '',
    city: '',
    email: '',
    image: {
      current: '',
      all: [],
    },
    error: '',
  },
};

/**
 * @function - create sub reducers for user
 * @param {string} subDomain  - Either AUTH_DOMAIN, REGISTRATION_DOMAIN, USER_DATA_DOMAINA
 * @return {function} - a reducer
 */
const createUserSubReducer = (subDomain) => (state = initialState[subDomain], action) => {
  const { type, payload } = action;
  const { domains, actionType } = getDomainsAndActionType(type);
  if (!isActionTypeEqual([USER_DOMAIN, subDomain], domains)) return state;
  switch (actionType) {
    case UPDATE:
      return { ...state, ...payload };
    case RESET:
      return { ...state, ...initialState[subDomain] };
    default:
      return state;
  }
};

const UserReducer = combineReducers({
  [AUTH_DOMAIN]: createUserSubReducer(AUTH_DOMAIN),
  [REGISTRATION_DOMAIN]: createUserSubReducer(REGISTRATION_DOMAIN),
  [USER_DATA_DOMAIN]: createUserSubReducer(USER_DATA_DOMAIN),
});

export default UserReducer;
