import {
  UPDATE, RESET, CHANGE_IMAGE, LOAD_IMAGES,
  LOGGED_IN, LOGGED_OUT,
  USER_DOMAIN, DATA_DOMAIN, AUTH_DOMAIN, POOL_DOMAIN,
} from '../../constants';
import {
  login, logout, checkLoginState,
  getUserProfile, getUserDataAsPostAuthor,
  updateUserProfilePic, getAllUserPics,
} from './services';
import { updateStoreData } from '../util';
import { normalizeUser } from './schema';
import { addPopup } from '../ui/popups';

function updateUserAuthDomain(status) {
  return updateStoreData(UPDATE, { status }, USER_DOMAIN, AUTH_DOMAIN);
}
function updateUserDataDomain(type, data = null) {
  return updateStoreData(type, data, USER_DOMAIN, DATA_DOMAIN);
}

function updateUserPoolDomain(type, userEntries) {
  return updateStoreData(type, userEntries, USER_DOMAIN, POOL_DOMAIN);
}

const updateAuthLocalAction = (status, userID = '', userEntries = {}) => (dispatch) => {
  dispatch(updateUserPoolDomain(UPDATE, userEntries));
  dispatch(updateUserDataDomain(status === LOGGED_IN ? UPDATE : RESET, { userID }));
  dispatch(updateUserAuthDomain(status));
};

const checkUserAuthStateAction = () => async (dispatch) => {
  try {
    const { data: { user_data: userData } } = await checkLoginState();
    const { userID, userEntries } = normalizeUser(userData);
    dispatch(updateAuthLocalAction(LOGGED_IN, userID, userEntries));
    return;
  } catch (error) {
    dispatch(updateAuthLocalAction(LOGGED_OUT));
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
    const { userID, userEntries } = normalizeUser(userData);
    dispatch(updateAuthLocalAction(LOGGED_IN, userID, userEntries));
    return;
  } catch (error) {
    dispatch(updateAuthLocalAction(LOGGED_OUT));
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};

const logoutAction = () => async (dispatch) => {
  try {
    await logout();
    throw new Error('log out');
  } catch (error) {
    dispatch(updateAuthLocalAction(LOGGED_OUT));
  }
};

/**
 * @function - action to get user data
 * @param {string} userID
 */
const getUserProfileAction = (userID = '') => async (dispatch) => {
  const { data } = await getUserProfile(userID);
  if (!data) {
    throw new Error('Could not find the user');
  }
  const { userEntries } = normalizeUser(data);
  dispatch(updateUserPoolDomain(UPDATE, userEntries));
};
/**
 * @function: update user profile pic
 * @param {string} oldImageName: file name of the old profile pic (not the current one)
 * @param {File} newImageFile : file of the new profile pic
 */
const updateUserPicAction = (oldImageName, newImageFile) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('oldImageName', oldImageName);
    formData.append('image', newImageFile);
    const { data } = await updateUserProfilePic(formData);
    const { userEntries } = normalizeUser(data);
    dispatch(updateUserPoolDomain(CHANGE_IMAGE, userEntries));
    return;
  } catch (error) {
    if (error && error.response) {
      throw error.response.data.toString();
    }
    throw error.toString();
  }
};
/**
 * @function: get all user pictures
 * @param {string} userID
 */
const getAllUserPicsAction = (userID) => async (dispatch) => {
  try {
    const { data } = await getAllUserPics(userID);
    const { userEntries } = normalizeUser(data);
    dispatch(updateUserPoolDomain(LOAD_IMAGES, userEntries));
  } catch (error) {
    let errorMessage = error;
    if (error && error.response) {
      const { status, data } = error.response;
      errorMessage = status === 500 ? 'Internal Server Error' : data;
    }
    dispatch(addPopup('Error in getting images', errorMessage));
  }
};
/**
 * @function: get user as author data (only name and image)
 * @param {string} userID
 */
const getUserAsPostAuthorAction = (userID) => async (dispatch, getState) => {
  const currentData = getState().user.pool[userID];
  if (currentData && currentData.name && currentData.image && currentData.image.current) {
    return;
  }
  const { data } = await getUserDataAsPostAuthor(userID);
  const { userEntries } = normalizeUser(data);
  dispatch(updateUserPoolDomain(UPDATE, userEntries));
};

export {
  checkUserAuthStateAction, loginAction, logoutAction,
  getUserProfileAction, updateUserPicAction, getAllUserPicsAction,
  getUserAsPostAuthorAction,
};
