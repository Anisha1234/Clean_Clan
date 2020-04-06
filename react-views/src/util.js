import { SERVER_ROOT } from './constants';

export const dosth = () => {};

/**
 * @function createFileURL : create a file url with file name (apply for image as well)
 * @param {string} fileName
 */
const createFileURL = (fileName) =>{
  if(fileName) return new URL(`images/${fileName}`, SERVER_ROOT);
  return '';
}

export {
  createFileURL,
};
