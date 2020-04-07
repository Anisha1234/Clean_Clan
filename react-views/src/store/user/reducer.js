import { combineReducers } from 'redux';
import {
<<<<<<< HEAD
<<<<<<< HEAD
  PENDING,
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
} from '../../constants';
import { createCommonSubreducer } from '../util';

const initialState = {
  [AUTH_DOMAIN]: {
    status: PENDING,
  },
  [USER_DATA_DOMAIN]: {
=======
  PENDING, UPDATE, RESET,
  USER_DOMAIN, AUTH_DOMAIN, REGISTRATION_DOMAIN, USER_DATA_DOMAIN,
=======
  PENDING,
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
>>>>>>> 560a7fe... add formik + reform redux store
} from '../../constants';
import { createCommonSubreducer } from '../util';

const initialState = {
  [AUTH_DOMAIN]: {
    status: PENDING,
  },
<<<<<<< HEAD
  registration: {
    status: '',
    message: '',
  },
  data: {
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  [USER_DATA_DOMAIN]: {
>>>>>>> 560a7fe... add formik + reform redux store
    user_id: '',
    name: '',
    like_count: 0,
    user_details: '',
    city: '',
    email: '',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 992e396... Allow user to upload profile picture
    image: {
      current: '',
      all: [],
    },
<<<<<<< HEAD
<<<<<<< HEAD
  },
};

const UserReducer = combineReducers({
  [AUTH_DOMAIN]:
    createCommonSubreducer(
      initialState[AUTH_DOMAIN], USER_DOMAIN, AUTH_DOMAIN,
    ),
  [USER_DATA_DOMAIN]:
    createCommonSubreducer(
      initialState[USER_DATA_DOMAIN], USER_DOMAIN, USER_DATA_DOMAIN,
    ),
=======
=======
    error: '',
>>>>>>> 992e396... Allow user to upload profile picture
=======
>>>>>>> 560a7fe... add formik + reform redux store
  },
};

const UserReducer = combineReducers({
<<<<<<< HEAD
  [AUTH_DOMAIN]: createUserSubReducer(AUTH_DOMAIN),
  [REGISTRATION_DOMAIN]: createUserSubReducer(REGISTRATION_DOMAIN),
  [USER_DATA_DOMAIN]: createUserSubReducer(USER_DATA_DOMAIN),
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  [AUTH_DOMAIN]:
    createCommonSubreducer(
      initialState[AUTH_DOMAIN], USER_DOMAIN, AUTH_DOMAIN,
    ),
  [USER_DATA_DOMAIN]:
    createCommonSubreducer(
      initialState[USER_DATA_DOMAIN], USER_DOMAIN, USER_DATA_DOMAIN,
    ),
>>>>>>> 560a7fe... add formik + reform redux store
});

export default UserReducer;
