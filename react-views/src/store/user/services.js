import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

const checkLoginState = async () => axios.get(
  `${SERVER_ROOT}/auth-check`,
  {
    params: {
      only_auth_check: true,
    },
    timeout: 4500,
    withCredentials: true,
  },
);

const login = async (email, password) => axios.post(
  `${SERVER_ROOT}/login`,
  { email, password },
  {
    withCredentials: true,
  },
);

const logout = async () => axios.get(
  `${SERVER_ROOT}/logout`,
);

const signup = async (name, email, details, city, password) => axios.post(
  `${SERVER_ROOT}/signup`,
  {
    name, email, user_details: details, city, password,
  },
);

const getUserProfile = async () => axios.get(
  `${SERVER_ROOT}/profile/my-profile`,
  {
    withCredentials: true,
  },
);

export {
  checkLoginState, login, logout, signup, getUserProfile,
};
