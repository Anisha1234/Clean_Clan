import {
  PENDING_STATE, LOGIN_STATE, LOGOUT_STATE
} from '../utilities/constants';

const initialState = {
  auth_state: PENDING_STATE,
};

const AuthReducer = (state = initialState, action) => {
  const { type } = action;
  switch(type){
    case LOGIN_STATE, LOGOUT_STATE, PENDING_STATE:
      return {...state, auth_state: type};
    default:
      return state;
  }
};

export default AuthReducer;
