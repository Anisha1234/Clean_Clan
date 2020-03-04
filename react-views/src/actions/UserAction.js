import {
  LOGIN_STATE, LOGOUT_STATE, PENDING_STATE,
} from '../utilities/constants';
import { checkLoginState } from '../services/UserService';

// authState only recieves 3 value: PENDING_STATE, LOGIN_STATE, LOGOUT_STATE
const updateUserDataAction = (authState, userData = null) => ({
  type: authState,
  user: userData,
});

const checkUserAuthStateAction = () => (dispatch) => {
  dispatch(updateUserDataAction(PENDING_STATE));
  checkLoginState()
    .then(({ data }) => {
      const { is_login: isLogin, user_data: userData } = data;
      if (isLogin) {
        dispatch(updateUserDataAction(LOGIN_STATE, userData));
        return;
      }
      dispatch(updateUserDataAction(LOGOUT_STATE));
    })
    .catch(() => {
      dispatch(updateUserDataAction(LOGOUT_STATE));
    });
};

const loginAction = (email, password) => (dispatch) => {
  console.log(email);
  console.log(password);
  dispatch(updateUserDataAction(LOGIN_STATE, { name: 'lantrungseo' }));
};

export {
  checkUserAuthStateAction, loginAction,
};
