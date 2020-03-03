import { request } from '../utilities';
import { serverRoot } from '../utilities/constants';

export const checkLoginState = () => {
  request.get(
    `${serverRoot}/auth-check`,
    {
      params:{
        only_auth_check: true
      }
    }
  )
  .then(({data}) => console.log(data));
};
