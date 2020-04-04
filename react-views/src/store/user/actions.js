import {
  UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
  USER_DOMAIN, USER_DATA_DOMAIN, AUTH_DOMAIN,
} from '../../constants';
import {
  login, logout, checkLoginState,
  getUserProfile, updateUserProfilePic,
} from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function  - action creator to update user state in auth domain
 * @param {string} status - status of the auth (logged in, logged out, pending...)
 * @param {string} message - message to show in the UI
 */
function updateUserAuthAction(status) {
  return updateStoreDataAction(UPDATE, { status }, USER_DOMAIN, AUTH_DOMAIN);
}

/**
 * @function - action creator update user state in data domain
 * @param {string} type - either UPDATE or RESET
 * @param {string} status - either FAIL, PENDING, DONE
 * @param {string} message - error/success message from actions
 * @param {object} data - user data
 */
function updateUserDataAction(type, data) {
  return updateStoreDataAction(type, data, USER_DOMAIN, USER_DATA_DOMAIN);
}

/**
 * @function - check user auth state
 */
const checkUserAuthStateAction = () => async (dispatch) => {
  try {
    const { data } = await checkLoginState();
    const { user_data: userData } = data;
    dispatch(updateUserAuthAction(LOGGED_IN));
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT));
  }
};

/**
 * @function - action to send user login form
 * @param {string} email
 * @param {string} password
 */
const loginAction = (email, password) => async (dispatch) => {
  try {
    const { data } = await login(email, password);
    const { error, user_data: userData } = data;
    if (error) throw error;
    dispatch(updateUserDataAction(UPDATE, userData));
    dispatch(updateUserAuthAction(LOGGED_IN));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT));
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
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
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};

export {
  checkUserAuthStateAction, loginAction, logoutAction,
  getUserProfileAction, updateUserPicAction,
};
