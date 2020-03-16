import { combineReducers } from 'redux';
import { PENDING, UPDATE, RESET } from '../util';
import { isActionTypeEqual, getDomainsAndActionType } from './util';

// domain
const USER_DOMAIN = 'user';
const AUTH_DOMAIN = 'auth';
const REGISTRATION_DOMAIN = 'registration';
const USER_DATA_DOMAIN = 'data';

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
  auth: createUserSubReducer(AUTH_DOMAIN),
  registration: createUserSubReducer(REGISTRATION_DOMAIN),
  data: createUserSubReducer(USER_DATA_DOMAIN),
});

export {
  USER_DOMAIN, AUTH_DOMAIN, REGISTRATION_DOMAIN, USER_DATA_DOMAIN,
};


export default UserReducer;
