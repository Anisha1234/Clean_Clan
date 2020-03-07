import axios from 'axios';
import { serverRoot } from '../utilities/constants';

const getPosts = async (userID = '') => axios.get(
  `${serverRoot}/timeline/posts`,
  {
    params: {
      user_id: userID,
    },
    withCredentials: true,
  },
);

const publishPost = (data) => axios.post(
  `${serverRoot}/post/create`,
  data,
  {
    withCredentials: true,
  },
);

export {
  getPosts, publishPost,
};
