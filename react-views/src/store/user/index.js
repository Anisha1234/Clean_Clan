<<<<<<< HEAD
<<<<<<< HEAD
import UserReducer from './reducer';
import {
  getUserProfileAction, checkUserAuthStateAction,
  loginAction, logoutAction, updateUserPicAction,
} from './actions';
import { signup } from './services';

export default UserReducer;
export {
  getUserProfileAction as getUserProfile,
  checkUserAuthStateAction as checkUserAuthState,
  loginAction as login,
  logoutAction as logout,
  signup,
  updateUserPicAction as updateUserPic,
};
=======
import { combineReducers } from 'redux';
import { PENDING, UPDATE, RESET } from '../../util';
import { isActionTypeEqual, getDomainsAndActionType } from '../util';

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
  [AUTH_DOMAIN]: createUserSubReducer(AUTH_DOMAIN),
  [REGISTRATION_DOMAIN]: createUserSubReducer(REGISTRATION_DOMAIN),
  [USER_DATA_DOMAIN]: createUserSubReducer(USER_DATA_DOMAIN),
});
=======
import UserReducer from './reducer';
import {
  getUserProfileAction, checkUserAuthStateAction,
  loginAction, logoutAction, updateUserPicAction,
} from './actions';
<<<<<<< HEAD
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
import { signup } from './services';
>>>>>>> 560a7fe... add formik + reform redux store

export default UserReducer;
export {
  getUserProfileAction as getUserProfile,
  checkUserAuthStateAction as checkUserAuthState,
  loginAction as login,
  logoutAction as logout,
  signup,
  updateUserPicAction as updateUserPic,
};
<<<<<<< HEAD

export default UserReducer;
>>>>>>> 5415bdb... restructure redux store
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
