import UserReducer from './reducer';
import {
  getUserProfileAction, checkUserAuthStateAction, getUserAsPostAuthorAction,
  loginAction, logoutAction,
  getAllUserPicsAction, updateUserPicAction,
} from './actions';
import { signup } from './services';

export default UserReducer;
export {
  getUserProfileAction as getUserProfile,
  checkUserAuthStateAction as checkUserAuthState,
  loginAction as login,
  logoutAction as logout,
  signup,
  updateUserPicAction as updateUserPic,
  getAllUserPicsAction as getAllUserPics,
  getUserAsPostAuthorAction as getUserAsPostAuthor,
};
