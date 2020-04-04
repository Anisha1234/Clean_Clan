import { combineReducers } from 'redux';
import {
  PENDING,
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
} from '../../constants';
import { createCommonSubreducer } from '../util';

const initialState = {
  [AUTH_DOMAIN]: {
    status: PENDING,
  },
  [USER_DATA_DOMAIN]: {
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
});

export default UserReducer;
