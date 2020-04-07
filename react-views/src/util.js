<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
import { SERVER_ROOT } from './constants';

export const dosth = () => {};

/**
 * @function createFileURL : create a file url with file name (apply for image as well)
 * @param {string} fileName
 */
<<<<<<< HEAD
<<<<<<< HEAD
const createFileURL = (fileName) => {
  if (fileName) return new URL(`images/${fileName}`, SERVER_ROOT);
  return '';
};

export {
  createFileURL,
=======
const serverRoot = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

// common status for request
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// common data update action types
const UPDATE = 'UPDATE';
const RESET = 'RESET';

// common user auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export {
  serverRoot,
  PENDING, DONE, FAIL, UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
>>>>>>> f86c3d6... Split common logic (util.js)
};
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
const createFileURL = (fileName) =>{
  if(fileName) return new URL(`images/${fileName}`, SERVER_ROOT);
=======
const createFileURL = (fileName) => {
  if (fileName) return new URL(`images/${fileName}`, SERVER_ROOT);
>>>>>>> 25138db... Lint react-views
  return '';
};

export {
  createFileURL,
};
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
