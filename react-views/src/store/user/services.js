import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const userServiceURL = `${SERVER_ROOT}/user`;

const checkLoginState = async () => axios.get(
  `${userServiceURL}/`,
  {
    timeout: 4500,
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

const signup = async (name, email, details, city, password) => axios.post(
  `${userServiceURL}/signup`,
  {
    name, email, user_details: details, city, password,
  },
);

const getUserProfile = async () => axios.get(
  `${userServiceURL}/profile/`,
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

export {
  checkLoginState, login, logout, signup,
  getUserProfile, updateUserProfilePic,
};
