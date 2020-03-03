import {
  PENDING_STATE,
} from '../utilities/constants';

const initialState = {
  auth_state: PENDING_STATE,
};

const AuthReducer = (state = initialState, action) => {
  const { type: authState } = action;
  return { ...state, auth_state: authState };
};

export default AuthReducer;
