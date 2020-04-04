import UserReducer from './reducer';
import {
  getUserProfileAction, checkUserAuthStateAction,
  loginAction, logoutAction, updateUserPicAction,
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
};
