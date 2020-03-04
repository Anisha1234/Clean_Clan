import axios from 'axios';
import { serverRoot } from '../utilities/constants';

const checkLoginState = async () => axios.get(
  `${serverRoot}/auth-check`,
  {
    params: {
      only_auth_check: true,
    },
    timeout: 4500,
  },
);

const login = async () => {

};

export {
  checkLoginState, login,
};
