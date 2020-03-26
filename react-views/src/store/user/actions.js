import {
  PENDING, DONE, FAIL, UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
  USER_DOMAIN, USER_DATA_DOMAIN, REGISTRATION_DOMAIN, AUTH_DOMAIN,
} from '../../constants';
import {
  login, logout, checkLoginState, signup,
  getUserProfile, updateUserProfilePic,
} from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function  - action creator to update user state in auth domain
 * @param {string} status - status of the auth (logged in, logged out, pending...)
 * @param {string} message - message to show in the UI
 */
function updateUserAuthAction(status, message = '') {
  return updateStoreDataAction(UPDATE, {
    status, message,
  }, USER_DOMAIN, AUTH_DOMAIN);
}
/**
 * @function - action creator to update user state in registration domain
 * @param {string} status - status of the sign in action (pending, done, fail,...)
 * @param {string} message - message to show in UI
 */
function updateUserRegistrationAction(status, message = '') {
  return updateStoreDataAction(UPDATE, {
    status, message,
  }, USER_DOMAIN, REGISTRATION_DOMAIN);
}

/**
 * @function - action creator update user state in data domain
 * @param {string} type - either UPDATE or RESET
 * @param {object} data
 */
function updateUserDataAction(type, data) {
  return updateStoreDataAction(type, data, USER_DOMAIN, USER_DATA_DOMAIN);
}

/**
 * @function - check user auth state
 */
const checkUserAuthStateAction = () => async (dispatch) => {
  try {
    dispatch(updateUserAuthAction(PENDING));
    const { data } = await checkLoginState();
    const { user_data: userData } = data;
    dispatch(updateUserAuthAction(LOGGED_IN));
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    dispatch(updateUserAuthAction(LOGGED_OUT));
    dispatch(updateUserDataAction(RESET, null));
  }
};

/**
 * @function - action to send user login form
 * @param {string} email
 * @param {string} password
 */
const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(updateUserAuthAction(PENDING, ''));
    const { data } = await login(email, password);
    const { error, user_data: userData } = data;
    if (error) throw error;
    dispatch(updateUserAuthAction(LOGGED_IN, ''));
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    if (error && error.response) {
      dispatch(updateUserAuthAction(LOGGED_OUT, error.response.data.toString()));
      return;
    }
    dispatch(updateUserAuthAction(LOGGED_OUT, error.toString()));
  }
};

/**
 * @function - action to log out user
 */
const logoutAction = () => async (dispatch) => {
  try {
    await logout();
    throw new Error('log out');
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT));
  }
};

/**
 * @function - action to get user data
 */

const getUserProfileAction = () => async (dispatch) => {
  try {
    const { data: { user_data: userData } } = await getUserProfile();
    dispatch(updateUserDataAction(UPDATE, userData));
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
  }
};
/**
 * @function: update user profile pic
 * @param {string} oldImageName: file name of the old profile pic (not the current one)
 * @param {File} newImageFile : file of the new profile pic
 */
const updateUserPicAction = (oldImageName, newImageFile) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append('oldImageName', oldImageName);
    data.append('image', newImageFile);
    const { data: { user_data: userData } } = await updateUserProfilePic(data);
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    if (error && error.response) {
      dispatch(updateUserDataAction(UPDATE, {
        error: error.response.data.toString(),
      }));
      return;
    }
    dispatch(updateUserDataAction(UPDATE, {
      error: error.toString(),
    }));
  }
};

/**
 * @function - action to send user's sign-up form
 * @param {string} name
 * @param {string} email
 * @param {string} details
 * @param {string} city
 * @param {string} password
 */
const signupAction = (name, email, details, city, password) => async (dispatch) => {
  try {
    dispatch(updateUserRegistrationAction(PENDING, ''));
    const { data: { error } } = await signup(name, email, details, city, password);
    if (error) throw error;
    dispatch(updateUserRegistrationAction(
      DONE,
      `Your account has been registered. 
      You will be redirected to login page shortly`,
    ));
    return;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(updateUserRegistrationAction(FAIL, error.response.data.toString()));
      return;
    }
    dispatch(updateUserRegistrationAction(FAIL, error.toString()));
  }
};

export {
  checkUserAuthStateAction, loginAction, logoutAction, signupAction,
  getUserProfileAction, updateUserPicAction,
};
