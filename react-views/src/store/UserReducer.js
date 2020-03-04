import {
  PENDING_STATE, LOGIN_STATE, LOGOUT_STATE,
} from '../utilities/constants';

const initialState = {
  auth_state: PENDING_STATE,
  data: null,
};

const UserReducer = (state = initialState, action) => {
  const { type, user } = action;
  switch (type) {
    case LOGIN_STATE:
    case LOGOUT_STATE:
    case PENDING_STATE:
      return { ...state, auth_state: type, data: user };
    default:
      return state;
  }
};

export default UserReducer;
