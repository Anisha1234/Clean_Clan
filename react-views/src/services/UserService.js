import axios from 'axios';
import { serverRoot } from '../utilities/constants';

const checkLoginState = async () => axios.get(
  `${serverRoot}/auth-check`,
  {
    params: {
      only_auth_check: true,
    },
    timeout: 4500,
    withCredentials: true,
  },
);

const login = async (email, password) => axios.post(
  `${serverRoot}/login`,
  { email, password },
  {
    withCredentials: true,
  },
);

const logout = async () => axios.get(
  `${serverRoot}/logout`,
  {
    withCredentials: true,
  },
);

const signup = async (name, email, details, city, password) => axios.post(
  `${serverRoot}/signup`,
  {
    name, email, user_details: details, city, password,
  },
);

export {
  checkLoginState, login, logout, signup,
};
