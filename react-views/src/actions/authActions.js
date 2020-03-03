import axios from 'axios';
import {
  serverRoot,
  LOGIN_STATE, LOGOUT_STATE, PENDING_STATE,
} from '../utilities/constants';

// helper functions
const checkAuthState = async () => axios.get(
  `${serverRoot}/auth-check`,
  {
    params: {
      only_auth_check: true,
    },
  },
);

// main actions
const updateAuthStateAction = (authState) => ({
  type: authState,
});

const checkAuthAction = () => (dispatch) => {
  dispatch(updateAuthStateAction(PENDING_STATE));
  checkAuthState()
    .then(({ data: isLogin }) => {
      if (isLogin) {
        dispatch(updateAuthStateAction(LOGIN_STATE));
        return;
      }
      dispatch(updateAuthStateAction(LOGOUT_STATE));
    })
    .catch(() => {
      dispatch(updateAuthStateAction(LOGOUT_STATE));
    });
};

const loginAction = () => {

};
// authState only recieves 3 value: PENDING_STATE, LOGIN_STATE, LOGOUT_STATE

export {
  checkAuthAction, loginAction,
};
