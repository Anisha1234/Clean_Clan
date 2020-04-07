import {
<<<<<<< HEAD
<<<<<<< HEAD
  UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
  USER_DOMAIN, USER_DATA_DOMAIN, AUTH_DOMAIN,
} from '../../constants';
import {
  login, logout, checkLoginState,
  getUserProfile, updateUserProfilePic,
=======
  PENDING, DONE, FAIL, UPDATE, RESET,
=======
  UPDATE, RESET,
>>>>>>> 560a7fe... add formik + reform redux store
  LOGGED_IN, LOGGED_OUT,
  USER_DOMAIN, USER_DATA_DOMAIN, AUTH_DOMAIN,
} from '../../constants';
import {
<<<<<<< HEAD
<<<<<<< HEAD
  login, logout, checkLoginState, signup, getUserProfile,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  login, logout, checkLoginState, signup,
=======
  login, logout, checkLoginState,
>>>>>>> 560a7fe... add formik + reform redux store
  getUserProfile, updateUserProfilePic,
>>>>>>> 992e396... Allow user to upload profile picture
} from './services';
import { updateStoreDataAction } from '../util';

/**
 * @function  - action creator to update user state in auth domain
 * @param {string} status - status of the auth (logged in, logged out, pending...)
 * @param {string} message - message to show in the UI
 */
<<<<<<< HEAD
<<<<<<< HEAD
function updateUserAuthAction(status) {
  return updateStoreDataAction(UPDATE, { status }, USER_DOMAIN, AUTH_DOMAIN);
=======
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
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
function updateUserAuthAction(status) {
  return updateStoreDataAction(UPDATE, { status }, USER_DOMAIN, AUTH_DOMAIN);
>>>>>>> 560a7fe... add formik + reform redux store
}

/**
 * @function - action creator update user state in data domain
 * @param {string} type - either UPDATE or RESET
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {string} status - either FAIL, PENDING, DONE
 * @param {string} message - error/success message from actions
 * @param {object} data - user data
=======
 * @param {object} data
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
 * @param {string} status - either FAIL, PENDING, DONE
 * @param {string} message - error/success message from actions
 * @param {object} data - user data
>>>>>>> 560a7fe... add formik + reform redux store
 */
function updateUserDataAction(type, data) {
  return updateStoreDataAction(type, data, USER_DOMAIN, USER_DATA_DOMAIN);
}

/**
 * @function - check user auth state
 */
const checkUserAuthStateAction = () => async (dispatch) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const { data } = await checkLoginState();
    const { user_data: userData } = data;
    dispatch(updateUserAuthAction(LOGGED_IN));
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT));
=======
    dispatch(updateUserAuthAction(PENDING));
=======
>>>>>>> 560a7fe... add formik + reform redux store
    const { data } = await checkLoginState();
    const { user_data: userData } = data;
    dispatch(updateUserAuthAction(LOGGED_IN));
    dispatch(updateUserDataAction(UPDATE, userData));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
<<<<<<< HEAD
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    dispatch(updateUserAuthAction(LOGGED_OUT));
>>>>>>> 560a7fe... add formik + reform redux store
  }
};

/**
 * @function - action to send user login form
 * @param {string} email
 * @param {string} password
 */
const loginAction = (email, password) => async (dispatch) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    dispatch(updateUserAuthAction(PENDING, ''));
=======
>>>>>>> 560a7fe... add formik + reform redux store
    const { data } = await login(email, password);
    const { error, user_data: userData } = data;
    if (error) throw error;
    dispatch(updateUserDataAction(UPDATE, userData));
    dispatch(updateUserAuthAction(LOGGED_IN));
    return;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
<<<<<<< HEAD
<<<<<<< HEAD
    dispatch(updateUserAuthAction(LOGGED_OUT, error.toString()));
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
=======
    dispatch(updateUserAuthAction(LOGGED_OUT));
>>>>>>> 560a7fe... add formik + reform redux store
    if (error && error.response) {
      throw error.response.data.toString();
    }
<<<<<<< HEAD
<<<<<<< HEAD
    dispatch(updateUserAuthAction(error.toString()));
>>>>>>> 316f811... Finish user services, lint react-views
=======
    dispatch(updateUserAuthAction(LOGGED_OUT, error.toString()));
>>>>>>> 992e396... Allow user to upload profile picture
=======
    throw error.toString();
>>>>>>> 560a7fe... add formik + reform redux store
  }
};

/**
 * @function - action to log out user
 */
const logoutAction = () => async (dispatch) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    await logout();
    throw new Error('log out');
=======
    const { data: logoutMessage } = await logout();
    throw logoutMessage;
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    await logout();
    throw new Error('log out');
>>>>>>> 316f811... Finish user services, lint react-views
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
<<<<<<< HEAD
<<<<<<< HEAD
    const { data: { user_data: userData } } = await getUserProfile();
=======
    const { data: userData } = await getUserProfile();
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
    const { data: { user_data: userData } } = await getUserProfile();
>>>>>>> 316f811... Finish user services, lint react-views
    dispatch(updateUserDataAction(UPDATE, userData));
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
  }
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 992e396... Allow user to upload profile picture
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
<<<<<<< HEAD
<<<<<<< HEAD
      throw error.response.data.toString();
    }
    throw error.toString();
=======
=======
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
>>>>>>> 992e396... Allow user to upload profile picture

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
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
      throw error.response.data.toString();
    }
    throw error.toString();
>>>>>>> 560a7fe... add formik + reform redux store
  }
};

export {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  checkUserAuthStateAction, loginAction, logoutAction,
  getUserProfileAction, updateUserPicAction,
=======
  checkUserAuthStateAction, loginAction, logoutAction, getUserProfileAction, signupAction,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  checkUserAuthStateAction, loginAction, logoutAction, signupAction,
=======
  checkUserAuthStateAction, loginAction, logoutAction,
>>>>>>> 560a7fe... add formik + reform redux store
  getUserProfileAction, updateUserPicAction,
>>>>>>> 992e396... Allow user to upload profile picture
};
