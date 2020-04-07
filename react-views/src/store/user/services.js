import axios from 'axios';
import { SERVER_ROOT } from '../../constants';

<<<<<<< HEAD
<<<<<<< HEAD
const userServiceURL = `${SERVER_ROOT}/user`;

const checkLoginState = async () => axios.get(
  `${userServiceURL}/`,
  {
<<<<<<< HEAD
=======
=======
const userServiceURL = `${SERVER_ROOT}/user`;

>>>>>>> 316f811... Finish user services, lint react-views
const checkLoginState = async () => axios.get(
  `${userServiceURL}/`,
  {
    params: {
      only_auth_check: true,
    },
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
>>>>>>> 992e396... Allow user to upload profile picture
    timeout: 4500,
    withCredentials: true,
  },
);

const login = async (email, password) => axios.post(
<<<<<<< HEAD
<<<<<<< HEAD
  `${userServiceURL}/login`,
=======
  `${SERVER_ROOT}/login`,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  `${userServiceURL}/login`,
>>>>>>> 316f811... Finish user services, lint react-views
  { email, password },
  {
    withCredentials: true,
  },
);

const logout = async () => axios.get(
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 316f811... Finish user services, lint react-views
  `${userServiceURL}/logout`,
  {
    withCredentials: true,
  },
<<<<<<< HEAD
);
/**
 * @param {{
 *  email: string,
 *  password:string,
 *  name: string,
 *  user_details: string,
 *  city: string
 * }} registrationData - registration form data
 */
const signup = async (registrationData) => axios.post(
  `${userServiceURL}/signup`,
  registrationData,
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
=======
  `${SERVER_ROOT}/logout`,
=======
>>>>>>> 316f811... Finish user services, lint react-views
);
/**
 * @param {{
 *  email: string,
 *  password:string,
 *  name: string,
 *  user_details: string,
 *  city: string
 * }} registrationData - registration form data
 */
const signup = async (registrationData) => axios.post(
  `${userServiceURL}/signup`,
  registrationData,
);

const getUserProfile = async () => axios.get(
<<<<<<< HEAD
  `${SERVER_ROOT}/profile/my-profile`,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  `${userServiceURL}/profile/`,
>>>>>>> 316f811... Finish user services, lint react-views
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
<<<<<<< HEAD
<<<<<<< HEAD
  checkLoginState, login, logout, signup,
  getUserProfile, updateUserProfilePic,
=======
  checkLoginState, login, logout, signup, getUserProfile,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
  checkLoginState, login, logout, signup,
  getUserProfile, updateUserProfilePic,
>>>>>>> 992e396... Allow user to upload profile picture
};
