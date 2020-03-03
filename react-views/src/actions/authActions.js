import axios from 'axios';
import { serverRoot } from '../utilities/constants';

const checkLoginState = () => {
  axios.get(
    `${serverRoot}/auth-check`,
    {
      params: {
        only_auth_check: true,
      },
    },
  )
    .then(({ data }) => console.log(data));
};

const login = () => {

};

export {
  checkLoginState, login,
};
