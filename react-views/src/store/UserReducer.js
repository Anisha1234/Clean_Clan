import {
  PENDING_STATE, LOGIN_STATE, LOGOUT_STATE, GET_USER_DATA,
} from '../utilities/constants';

const initialState = {
  auth_state: PENDING_STATE,
  data: null,
};

const UserReducer = (state = initialState, action) => {
  const { type, user } = action;
  switch (type) {
    case PENDING_STATE:
    case LOGOUT_STATE:
      return {
        ...state,
        auth_state: type,
        data: null,
      };
    case LOGIN_STATE:
      return {
        ...state,
        auth_state: type,
      };
    case GET_USER_DATA:
      return {
        ...state,
        data: { ...state.data, ...user },
      };
    default:
      return state;
  }
};

export default UserReducer;
