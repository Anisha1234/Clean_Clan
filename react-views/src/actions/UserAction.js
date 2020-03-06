import {
  LOGIN_STATE, LOGOUT_STATE, PENDING_STATE, GET_USER_DATA,
} from '../utilities/constants';
import {
  checkLoginState, login, logout, getUserProfile,
} from '../services/UserService';

// authState only recieves 3 value: PENDING_STATE, LOGIN_STATE, LOGOUT_STATE
const updateUserAuthStateAction = (authState) => ({
  type: authState,
});

const updateUserDataAction = (userData) => ({
  type: GET_USER_DATA,
  user: userData,
});

const checkUserAuthStateAction = () => (dispatch) => {
  dispatch(updateUserAuthStateAction(PENDING_STATE));
  checkLoginState()
    .then(({ data }) => {
      const { is_login: isLogin, user_data: userData } = data;
      if (isLogin) {
        dispatch(updateUserAuthStateAction(LOGIN_STATE));
        dispatch(updateUserDataAction(userData));
        return;
      }
      dispatch(updateUserAuthStateAction(LOGOUT_STATE));
    })
    .catch(() => {
      dispatch(updateUserAuthStateAction(LOGOUT_STATE));
    });
};

const loginAction = (email, password) => async (dispatch) => {
  const { data } = await login(email, password);
  const { message, user_data: userData } = data;
  if (message === 'Success') {
    dispatch(updateUserAuthStateAction(LOGIN_STATE));
    dispatch(updateUserDataAction(userData));
    return;
  }
  dispatch(updateUserAuthStateAction(LOGOUT_STATE));
  throw message;
};

const logoutAction = () => (dispatch) => {
  logout()
    .then(() => {
      dispatch(updateUserAuthStateAction(LOGOUT_STATE));
    })
    .catch(() => {
      dispatch(updateUserAuthStateAction(LOGOUT_STATE));
    });
};

const getUserProfileAction = () => (dispatch) => {
  getUserProfile()
    .then(({ data: userData }) => {
      dispatch(updateUserDataAction(userData));
    })
    .catch(() => {
      dispatch(updateUserAuthStateAction(LOGOUT_STATE));
    });
};

export {
  checkUserAuthStateAction, loginAction, logoutAction, getUserProfileAction,
};
