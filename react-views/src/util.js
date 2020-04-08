import { SERVER_ROOT } from './constants';

export const dosth = () => {};

/**
 * @function createImageURL : create a file url with file name (apply for image as well)
 * @param {string} fileName
 */
const createImageURL = (imageName) => {
  if (imageName) return new URL(`images/${imageName}`, SERVER_ROOT);
  return '';
};

export {
  createImageURL,
};
