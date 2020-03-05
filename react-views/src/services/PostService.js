import axios from 'axios';
import { serverRoot } from '../utilities/constants';

const getPosts = async (userID = '') => axios.get(
  `${serverRoot}/timeline/posts`,
  {
    params: {
      user_id: userID,
    },
  },
);

const uploadPost = () => {

};

export {
  getPosts, uploadPost,
};
