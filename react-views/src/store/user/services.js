import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const userServiceURL = `${SERVER_ROOT}/user`;

const checkLoginState = async () => axios.get(
  `${userServiceURL}/`,
  {
    timeout: 2000,
    withCredentials: true,
  },
);

const login = async (email, password) => axios.post(
  `${userServiceURL}/login`,
  { email, password },
  {
    withCredentials: true,
  },
);

const logout = async () => axios.get(
  `${userServiceURL}/logout`,
  {
    withCredentials: true,
  },
);

const signup = async (registrationData) => axios.post(
  `${userServiceURL}/signup`,
  registrationData,
);

const getUserProfile = async (userID) => axios.get(
  `${userServiceURL}/profile/${userID}`,
  {
    withCredentials: true,
  },
);

const getUserDataAsPostAuthor = async (userID) => axios.get(
  `${userServiceURL}/author/${userID}`,
  {
    withCredentials: true,
  },
);

const updateUserProfilePic = async (data) => axios.post(
  `${userServiceURL}/profile/image`,
  data,
  {
    withCredentials: true,
  },
);

const getAllUserPics = async (userID) => axios.get(
  `${userServiceURL}/profile/image/all/${userID}`,
  {
    withCredentials: true,
  },
);

export {
  checkLoginState, login, logout, signup,
  getUserProfile, getUserDataAsPostAuthor,
  updateUserProfilePic, getAllUserPics,
};
